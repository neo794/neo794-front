import { PlElement, html, css } from "polylib";
import Chart from 'chart.js/auto';

class PfChart extends  PlElement {
    static properties = {
        data: { type: Array, value: () => { return [] }, observer: "dataObserver" },
        labels: { type: Array, value: () => { return [] } },
        type: { type: String, value: 'doughnut' },
        width: { type: String },
        title: { type: String },
        responsive: { type: Boolean, value: true },
        legend_display: { type: Boolean, value: true },
        title_display: { type: Boolean, value: true }
    };
    static css = css ``;
    static template = html `
        <canvas id="chart" width$="[[width]]"></canvas>
    `;

    dataObserver(e) {
        if (e) {
            if (this.chart) {
                this.chart.destroy();
            }
            const data = {
                labels: this.labels,
                datasets: [
                    {
                        label: null,
                        data: this.data,
                        backgroundColor: this.initColors(this.data),
                        hoverOffset: 10
                    }
                ]
            };
            const footer = (item) => {
                return item[0].parsed + '%';
            };
            const config = {
                type: this.type,
                data: data,
                options: {
                    responsive: this.responsive,
                    plugins: {
                        legend: {
                            display: this.legend_display
                        },
                        tooltip: {
                            callbacks: {
                                footer: footer
                            }
                        },
                        title: {
                            display: this.title_display,
                            text: this.title,
                        },
                        colors: {
                            forceOverride: true
                        }
                    }
                }
            };
            this.chart = new Chart(this.$.chart,config);
        }
    }

    initColors(data) {
        const fill_colors = [
            'rgba(255, 99, 132, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 205, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
        ];
        const range = fill_colors.length-1;
        const count = data.length-1;
        let colors = [];

        let m = {};
        for (let i = 0; i <= count; ++i) {
            let r = Math.floor(Math.random() * (range - i));
            let int = ((r in m) ? m[r] : r) + 1;
            colors.push(fill_colors[int]);
            let l = range - i - 1;
            m[r] = (l in m) ? m[l] : l;
        }

        return colors;
    }
}

customElements.define('pf-chart', PfChart);