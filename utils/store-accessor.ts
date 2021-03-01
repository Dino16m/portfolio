import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Projects from '~/store/projects'

let ProjectsStore: Projects

function initialiseStores(store: Store<any>): void {
    ProjectsStore = getModule(Projects, store)
}

export { initialiseStores, ProjectsStore }