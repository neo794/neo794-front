import { PlElement, html, css } from "polylib";

class PfLocalSort extends PlElement {
    static properties = {
        targetContainer: { type: Object }
    };
    static template = html ``;

    connectedCallback() {
        super.connectedCallback();
        this.target = this.targetContainer || this.parentNode;
        [...this.target.querySelectorAll('pl-grid[id][local-sort]')].forEach( e => {

            e._changeColumnSort = (event) => {
                let sorts = e.data.sorts || [];
                console.log(this.target.gCountryEvents);
                // const ind = sorts.findIndex(item => item.field === event.field);
                // if (ind >= 0) {
                //     let newSort = {};
                //     if (sorts[ind].sort === 'asc') {
                //         newSort = {
                //             field: event.field,
                //             sort: 'desc'
                //         };
                //         sorts.splice(ind, 1);
                //         sorts.splice(0, 0, newSort);
                //     } else {
                //         sorts.splice(ind, 1);
                //     }
                //     // this.set('target.$.'+e.id+'.data.sorts', sorts);
                //     this.target.$[e.id].data.sort = sorts;
                // } else {
                //     let newSort = {
                //         field: event.field,
                //         sort: 'asc'
                //     };
                //     sorts.splice(0, 0, newSort);
                //     // this.set('target.$.'+e.id+'.data.sorts', sorts);
                //     this.target.$[e.id].data.sort = sorts;
                // }
                //
                // console.log(sorts);
            }
        });
    }
}
customElements.define('pf-local-sort', PfLocalSort);