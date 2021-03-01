<template>
    <div class="base">
        <v-card elevation="5">
            <v-form class="pa-4" ref="editForm" @submit.prevent="submit">
                <v-text-field label="name" v-model="name"/>
                <v-textarea 
                    v-model="desc" label="description" 
                    :rules="[required]"
                    placeholder="this project is..."
                />
                <v-combobox 
                    :rules="[required]"
                    :items="[]" label="tags" multiple chips v-model="tags"
                />
                <v-file-input 
                    clearable label="primary pic" v-model="primaryPic"
                    :rules="[required]"
                />
                <v-file-input 
                    clearable label="secondary pic" v-model="secondaryPic"
                    :rules="[required]"
                />
                <v-combobox 
                    :items="[]" label="tech" multiple chips 
                    v-model="techSheet" :rules="[required]"
                />
                <v-text-field 
                    :rules="[required]"
                    label="availability" placeholder="example.com" 
                    v-model="availability"
                />
                <v-combobox 
                    :items="[]" label="credits" v-model="credits" 
                    multiple chips :rules="[required]"
                /> 
                <div class="d-flex flex-row">
                    <v-btn 
                        class="red d-block mr-auto" left dark
                        @click="remove"
                        :loading="removing"
                    >
                        Delete
                    </v-btn>
                    <v-btn 
                        type="submit" :loading="submitting" 
                        class="primary d-block ml-auto" right
                    >
                        Submit
                    </v-btn>

                </div>
            </v-form>
        </v-card>
    </div>
</template>
<script lang="ts">
import {Component, Vue, namespace, Watch, Ref} from 'nuxt-property-decorator'
import IProject from "@/types/project"
import UProject from "@/types/UProject"
import requiredRule from '@/rules/requiredRule'
import {getOrCreateFireApp, adminEmail} from '@/utils/firebase-app'

const projects = namespace("projects")

@Component({
    middleware({store, redirect}){
        const app = getOrCreateFireApp()
        const user = app.auth().currentUser
        if (user?.email != adminEmail) redirect('/admin')
    }
})
export default class EditProject extends Vue{
    @Ref()
    editForm!: any

    removing = false
    submitting = false
    required = requiredRule
    emptyFile = new File([], "empty.png")

    @projects.State
    projects!: IProject[]

    @projects.Action
    getProjects!: () => Promise<void>

    @projects.Action
    removeProject!: (project: IProject) => Promise<boolean>

    @projects.Action
    modifyProject!: (p: UProject) => Promise<void>

    name = ""
    desc = ""
    tags = [] as string[]
    primaryPic =this.emptyFile
    originalPrimPic = this.emptyFile
    secondaryPic = this.emptyFile
    originalSecPic = this.emptyFile
    techSheet = [] as string[]
    credits = [] as string[]
    availability = ""

    get project(){
        return this.projects.find(project => project.id == this.$route.params['id'])
    }

    @Watch("project")
    setup(project: IProject){
        this.name = project.name
        this.desc = project.desc
        this.tags = project.tags
        this.primaryPic = this.originalPrimPic = new File([], project.primaryImage)
        this.secondaryPic = this.originalSecPic = new File([], project.secondaryImage)
        this.techSheet = project.techSheet
        this.credits = project.credits
        this.availability = project.availability
    }

    get payload(){
        const p = {
            name: this.name,
            desc: this.desc,
            tags: this.tags,
            techSheet: this.techSheet,
            credits: this.credits,
            availability: this.availability,
            primaryImage: this.project?.primaryImage,
            secondaryImage: this.project?.secondaryImage,
            id: this.project?.id
        } as UProject
        if (this.fileChanged(this.primaryPic, this.originalPrimPic)){
            p.primaryPic = this.primaryPic
        }
        if(this.fileChanged(this.secondaryPic, this.originalSecPic)){
            p.primaryPic = this.secondaryPic
        }
        return p
    }
    fileChanged(field: File, original: File){
        return field != this.emptyFile && field?.name != original.name
    }
    async submit(){
        if (!this.editForm.validate()) return
        this.submitting = true
        await this.modifyProject(this.payload)
        this.submitting = false
    }

    async remove(){
        if (! confirm("Are you sure") ) return
        if (this.project?.id){
            this.removing = true
           const done = await this.removeProject(this.project)
           this.removing = false
           if(done) this.$router.back()
        }
    }

    async created(){
        if(this.projects.length < 1)
            await this.getProjects()
        if (this.project)
            this.setup(this.project)
    }
}
</script>
<style lang="scss" scoped>
@import '~vuetify/src/styles/styles.sass';
.base{
    margin-top: 5rem;
    display: block;
    padding: 5rem 15rem;
}
@media #{map-get($display-breakpoints, 'xs-only')} {
    .base{
        padding: 3rem 1rem;
    }
}
</style>