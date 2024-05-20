import {Paginator} from "../../lib/Paginator";
import {Client, CommandInteraction, Interaction} from "discord.js";
import {Addable} from "@lavaclient/plugin-queue";
import {Embed} from "../../extensions/Embed";

export class QueuePaginator extends Paginator {
    public embeds: Embed[] = []
    private options: QueuePaginatorOptions
    public pages?: Array<Array<string>>;

    constructor(options: QueuePaginatorOptions, input: Array<string>, itemsPerPage?: number) {
        super(input, itemsPerPage);

        this.input = input;
        if(itemsPerPage) this.itemsPerPage = itemsPerPage;

        this.options = options;

        this.pages = this.paginate()
        this.createEmbeds()

    }

    private createEmbeds() {

        for (let i = 1; i < this.pages!.length + 1; i += 1) {
            let embed = new Embed().queuePage(this.pages![i-1], i, this.pages!.length)

            this.embeds.push(embed)

        }
    }



    public async run() {
        await this.options.interaction.editReply({embeds: [this.embeds[0]]})
    }



}

interface QueuePaginatorOptions {
    interaction: CommandInteraction;
}