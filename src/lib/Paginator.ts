import { Addable } from "@lavaclient/plugin-queue";

export class Paginator {
    public input: Array<string>;
    public itemsPerPage = 10;
    public pages?: Array<Array<string>>;

    constructor(input: Array<string>, itemsPerPage?: number) {
        this.input = input;
        if(itemsPerPage) this.itemsPerPage = itemsPerPage;

    }

    public paginate() {

        let pages = []

        for(let i = 0; i < this.itemsPerPage; i+= this.itemsPerPage) {
            pages?.push(this.input.slice(i, i + this.itemsPerPage));
        }

        return this.pages = pages
    }
}
