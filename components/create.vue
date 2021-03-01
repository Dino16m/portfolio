<template>
    <div class="base">
        <v-card elevation="5">
            <v-form class="pa-4" ref="createForm" @submit.prevent="submit">
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
import {Component, Vue, namespace, Ref} from 'nuxt-property-decorator'
import UProject from "@/types/UProject"
import requiredRule from '@/rules/requiredRule'

const projects = namespace("projects")


@Component
export default class CreateProject extends Vue{
    emptyFile = new File([], "empty.png")
    @Ref()
    createForm!: any

    submitting = false
    required = requiredRule
   
    @projects.Action
    createProject!: (p: UProject) => Promise<boolean>

    name = ""
    desc = ""
    tags = [] as string[]
    primaryPic = this.emptyFile
    secondaryPic = this.emptyFile
    techSheet = [] as string[]
    credits = [] as string[]
    availability = ""

    get payload(){
        const p = {
            name: this.name,
            desc: this.desc,
            tags: this.tags,
            techSheet: this.techSheet,
            credits: this.credits,
            availability: this.availability,
            primaryPic: this.primaryPic,
            secondaryPic: this.secondaryPic
        } as UProject
        return p
    }

    async submit(){
        if (!this.createForm.validate()) return
        this.submitting = true
        const done = await this.createProject(this.payload)
        this.submitting = false
        if(done) {
            this.reset()
        }
    }

    reset(){
        this.name = ""
        this.desc = ""
        this.tags = [] as string[]
        this.primaryPic = this.emptyFile
        this.secondaryPic = this.emptyFile
        this.techSheet = [] as string[]
        this.credits = [] as string[]
        this.availability = ""
    }
    
}
</script>
<style lang="scss" scoped>
@import '~vuetify/src/styles/styles.sass';
.base{
    margin: 1.5rem 0;
    display: block;
    padding: 0rem 15rem;
}
@media #{map-get($display-breakpoints, 'xs-only')} {
    .base{
        padding: 0rem 1rem;
    }
}
</style>