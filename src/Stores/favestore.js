import { observable, computed, action, runInAction } from 'mobx'
import axios from "axios"

export class FaveStore {
    @observable favList = []

    @action
    async AddFav(url, desc) {
        this.favList.push({url: url, desc: desc})
    }



    @action
    async RemoveFav(data) {
        for (let i = 0; i < this.favList.length; i++) {
            if (this.favList[i].url === data) {
                this.favList.splice(i, 1)
            }
        }

    }

    @action
    async EditDesc(url, desc) {
        this.favList.find((o) => o.url === url).desc = desc;
    }

    @action
    async GetFavList() {
        return this.favList
    }
}