import * as React from 'react';
import {action, observable, computed} from 'mobx';
import {observer} from 'mobx-react';

import {withStyles, createStyleSheet} from 'material-ui/styles';
import Checkbox from 'material-ui/Checkbox';

// Checkbox example: https://codepen.io/aaronschwartz/pen/WOOPRw?editors=0010
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import { Component, ObservableMap } from '../common';

export type Datum = object | {
    [field : string]: React.ReactText | JSX.Element;
};

export type SelectedRows = number[] | 'none' | 'all';
export type Sort = [string, 'asc'|'desc'];

function getSafeKey(any) {
    return any && (any.key || (any.dto && any.dto.accountId) || any.title || JSON.stringify(any));
}

interface ITableProps<Datum extends {} = {}> {
    className?: string;
    columns: string[];
    headers: { [field: string]: string };
    data: Datum[];

    selected?: ObservableMap<Datum>;
    selectAll?: ()=>Promise<Datum[]>;

    tableProps?: {};
}

const styleSheet = createStyleSheet('Table', (theme) => ({
    root: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    th: {
        textAlign: 'center',
        height: '100%',
    },
    td: {
        textAlign: 'right',
        height: '100%',
    },
    tr: {
        alignItems: 'center',
    },
}));

@observer
class Table extends Component<ITableProps, 'root'|'td'|'th'|'tr'> {
    @observable pages: number = null;
    @observable loading: boolean = true;
    @observable selectAll: number = 0;

    @action toggleRow = (datum) => {
        const safeKey = getSafeKey(datum);
        if(this.props.selected.get(safeKey)) {
            this.props.selected.delete(safeKey);
        } else {
            this.props.selected.set(safeKey, datum);
        }
        this.selectAll = 2;
    }

    @action toggleSelectAll = async () => {
        try {
            if (this.selectAll === 0) {
                this.props.selected.replace(await this.props.selectAll());
                this.selectAll = 1;
            } else {
                this.props.selected.clear();
                this.selectAll = 0;
            }
        } catch(e) {
            console.error(e);
        }
    }

    @computed get renderCheckboxColumn() {
        return {
            id: 'checkbox',
            accessor: '',
            Cell: ({ original }) => (<Checkbox
                    checked={this.props.selected.has(getSafeKey(original))}
                    onChange={() => this.toggleRow(original)}
                />),
            Header: this.props.selectAll !== null ? () => (<Checkbox
                    checked={this.selectAll === 1}
                    indeterminate={this.selectAll === 2}
                    onChange={() => this.toggleSelectAll()}
                />) : undefined,
            sortable: false,
            width: 48,  // equal Checkbox default width.
            style: { padding: '0' },
            headerStyle: { padding: '0' },
        };
    }

    @computed get renderColumns() {
        const columns = this.props.columns.map((column) => ({
                Header: this.props.headers[column],
                accessor: column,
            }));
        if(this.props.selected) columns.unshift(this.renderCheckboxColumn as any);
        return columns;
    }

    render() {

        if(this.props.selected) this.props.selected.toArray();  // Trigger MobX redraw.

        return (
            <ReactTable
                className={`-striped -highlight ${this.props.classes.root} ${this.props.className||''}`}
                columns={ this.renderColumns }
                getTdProps={() => ({ className: this.props.classes.td })}
                getTrProps={() => ({ className: this.props.classes.tr })}
                getTheadThProps={() => ({ className: this.props.classes.th })}
                getTheadTrProps={() => ({ className: this.props.classes.tr })}
                data={this.props.data}
                defaultPageSize={10}
                {...(this.props.tableProps ||{})}
            />
        );
    }
}
export default withStyles<ITableProps>(styleSheet)(Table);
