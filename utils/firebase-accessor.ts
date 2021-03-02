import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import IProject from '~/types/project'
import UProject from '~/types/UProject'

const ProjectMapper = {
    toFirestore: function(p: IProject) {
        return {
            name: p.name,
            desc: p.desc,
            tags: p.tags,
            primaryImage: p.primaryImage,
            secondaryImage: p.secondaryImage,
            techSheet: p.techSheet,
            availability: p.availability,
            credits: p.credits,
        }
    },
    fromFirestore: function(snapshot: any, options: any){
        const data = snapshot.data(options)
        return data as IProject
    }
}
export default class ProjectAccessor{

    root!:  firebase.storage.Reference
    db!: firebase.firestore.Firestore
    constructor(private app: firebase.app.App){
        this.root =  app.storage().ref()
        this.db = app.firestore()
    }

    async create(raw: UProject){
        raw.primaryImage = await this.uploadFile(raw.primaryPic)
        raw.secondaryImage = await this.uploadFile(raw.secondaryPic)
        const docRef = await this.db.collection("projects")
                        .withConverter(ProjectMapper)
                        .add(raw)
        raw.id = docRef.id
        return raw as IProject
    }

    private async uploadFile(file: File){
        const fileName = this.randString() + "-" + file.name
        const ref = this.root.child(fileName)
        await ref.put(file)
        return await ref.getDownloadURL() as Promise<string>
    }

    private randString(){
        return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 9);
    }

    async read(){
        const snapshot = await this.db.collection("projects").get()
        const projects = [] as IProject[]
        snapshot.forEach(doc => {
            const project = doc.data() as IProject
            project.id = doc.id
            projects.push(project)
        })
        return projects
    }

    async update(modified: UProject){
        if (modified.primaryPic){
            modified.primaryImage = await this.replaceFile(
                modified.primaryImage,
                modified.primaryPic
            )
        }
        if(modified.secondaryPic){
            modified.secondaryImage = await this.replaceFile(
                modified.secondaryImage,
                modified.secondaryPic
            )
        }
        await this.db.collection("projects")
            .withConverter(ProjectMapper)
            .doc(modified.id).set(modified, {merge: true})
        return modified as  IProject
    }

    private async replaceFile(oldPath: string, newFile: File){
        const oldRef = this.app.storage().refFromURL(oldPath)
        oldRef.delete().catch(reason => console.log(reason))
        const newFilePath = await this.uploadFile(newFile)
        return newFilePath
    }

    async remove(project: IProject){
        await  this.deleteFile(project.primaryImage)
        await this.deleteFile(project.secondaryImage)
        this.db.collection("projects").doc(project.id).delete()
    }

    private async deleteFile(path: string){
        const ref = this.app.storage().refFromURL(path)
        await ref.delete()
    }
}