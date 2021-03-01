import firebase from 'firebase'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import IProject from '~/types/project'
import UProject from '~/types/UProject'
import ProjectAccessor from '~/utils/firebase-accessor'
import {getOrCreateFireApp} from '~/utils/firebase-app'

let adapter: ProjectAccessor
const helper = () => {
  if(!adapter){
    const app = getOrCreateFireApp()
    adapter = new ProjectAccessor(app)
  }
  return adapter
}

@Module({
    name: "projects",
    stateFactory: true,
    namespaced: true,
  })
export default class Projects extends VuexModule{
    projects = [] as IProject[]
    user = {} as firebase.User

    get tags(){
      let tags = [] as string[]
      let projects = [...this.projects]
      projects.forEach(project => {
        tags = [...tags, ...project.tags] 
      })
      const tagSet = new Set(tags)
      return [...tagSet]
    }
    
    @Mutation
    setProjects(projects: IProject[]){
      this.projects = [...projects]
    }
    @Mutation
    updateProject(updated: IProject){
      const projects = [...this.projects]
      const index = projects.findIndex(p => p.id == updated.id)
      projects[index] = updated
      this.projects = [...projects]
    }

    @Mutation
    addProject(project: IProject){
      this.projects = [...this.projects, project]
    }

    @Mutation
    deleteProject(id: string){
      const projects = [...this.projects]
      const index = projects.findIndex(p => p.id == id)
      projects.splice(index, 1)
      this.projects = [...projects]
    }

    @Action
    async modifyProject(raw: UProject){
      try {
        const project = await helper().update(raw)
        this.context.commit("updateProject", project)
      } catch (error) {
        console.error(error)
      }
    }

    @Action
    async createProject(raw: UProject): Promise<boolean>{
      try {
        const project = await helper().create(raw)
        this.context.commit("addProject", project)
      } catch (error) {
        console.error(error)
        return false
      }
      return true
    }

    @Action
    async removeProject(project: IProject): Promise<boolean>{
      try {
        await helper().remove(project)
        this.context.commit("deleteProject", project.id)
      } catch (error) {
        console.error(error)
        return false
      }
      return true
    }
    
    @Action
    async getProjects(){
      try {
        const projects = await helper().read()
        this.context.commit("setProjects", projects)
      } catch (error) {
        console.error(error)
      }
    }
}