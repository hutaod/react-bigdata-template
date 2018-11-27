import React, { Component } from 'react';
import { Button } from 'antd'

class TableToExcel extends Component {
    constructor(props) {
        super(props);
        this.handleDownload = this.handleDownload.bind(this);
    }

    base64 = (s) => {
        return window.btoa(unescape(encodeURIComponent(s)));
    }

    format = (s, c) => {
        return s.replace(/{(\w+)}/g, (m, p) => c[p]);
    }

    handleDownload = ()=> {
        if (!document) {
            if (process.env.NODE_ENV !== 'production') {
                console.error('Failed to access document object');
            }
            return null;
        }
        if(!this.props.table){
            console.error('需传入table参数，参数为table的id！');
            return null;
        }
        if (document.getElementById(this.props.table).nodeType !== 1 || document.getElementById(this.props.table).nodeName !== 'TABLE') {
            if (process.env.NODE_ENV !== 'production') {
                console.error('Provided table property is not html table element');
            }

            return null;
        }
        const table = document.getElementById(this.props.table).outerHTML;
        const sheet = String(this.props.sheet);
        const filename = `${String(this.props.filename)}.xls`;

        const uri = 'data:application/vnd.ms-excel;base64,';
        const template =
            '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-mic' +
            'rosoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta cha' +
            'rset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:Exce' +
            'lWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/>' +
            '</x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></' +
            'xml><![endif]--></head><body>{table}</body></html>';

        const context = {
            worksheet: sheet || 'Worksheet',
            table,
        };

        const element = window.document.createElement('a');
        element.href =
            uri +
            this.base64(
                this.format(template, context),
            );
        element.download = filename;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);

        return true;
    }
    render() {
        const content = this.props.content?(
            <span onClick={this.handleDownload}>{this.props.content}</span>
        ):(
            <Button
                id={this.props.id}
                className={this.props.className}
                onClick={this.handleDownload}
            >
                {this.props.buttonText}
            </Button>
        )
        return (
            <React.Fragment>{content}</React.Fragment>
        );
    }
}

export default TableToExcel;