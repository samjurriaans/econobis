import React, { Component } from 'react';
import { connect } from 'react-redux';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';

import ProductionProjectsListItem from './ProductionProjectsListItem';
import ProductionProjectsDeleteItem from './ProductionProjectsDeleteItem';
import DataTablePagination from "../../../components/dataTable/DataTablePagination";

class ProductionProjectsList extends Component {
    constructor(props){
        super(props);

        this.state = {
            showDeleteItem: false,
            deleteItem: {
                id: '',
                name: '',
            }
        };

    }

    showDeleteItemModal = (id, name) => {
        this.setState({
            ...this.state,
            showDeleteItem: true,
            deleteItem:{
                ...this.state.deleteItem,
                id,
                name
            }
        });
    };

    closeDeleteItemModal = () => {
        this.setState({
            ...this.state,
            showDeleteItem: false,
            deleteItem:{
                ...this.state.deleteItem,
                id: '',
                name: '',
            }
        });
    };

    render() {
        const { data = [], meta = {}, isLoading } = this.props.productionProjects;

        return (
        <div>
            <DataTable>
                <DataTableHead>
                    <tr className="thead-title-quaternary">
                        <DataTableHeadTitle title={'Project code'} width={'15%'}/>
                        <DataTableHeadTitle title={'Naam'} width={'20%'}/>
                        <DataTableHeadTitle title={'Aantal eenheden'} width={'10%'}/>
                        <DataTableHeadTitle title={'Capaciteit kWh'} width={'15%'}/>
                        <DataTableHeadTitle title={'Uitgegeven participaties'} width={'10%'}/>
                        <DataTableHeadTitle title={'Participaties beschikbaar'} width={'10%'}/>
                        <DataTableHeadTitle title={'Percentage uitgegeven'} width={'14%'}/>
                        <DataTableHeadTitle title={''} width={'6%'}/>
                    </tr>
                </DataTableHead>
                <DataTableBody>
                    {
                        data.length === 0 ? (
                            <tr>
                                <td colSpan={9}>Geen productie projecten gevonden!</td>
                            </tr>
                        ) : (
                            data.map(productionProject => (
                                <ProductionProjectsListItem
                                    key={productionProject.id}
                                    {...productionProject}
                                    showDeleteItemModal={this.showDeleteItemModal}
                                />
                            ))
                        )
                    }
                </DataTableBody>
            </DataTable>
            <div className="col-md-6 col-md-offset-3">
                <DataTablePagination
                    onPageChangeAction={this.props.handlePageClick}
                    totalRecords={meta.total}
                    initialPage={this.props.productionProjectsPagination.page}
                />
            </div>
            {
                this.state.showDeleteItem &&
                <ProductionProjectsDeleteItem
                    closeDeleteItemModal={this.closeDeleteItemModal}
                    fetchProductionProjectsData={this.props.fetchProductionProjectsData}
                    {...this.state.deleteItem}
                />
            }
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        productionProjects: state.productionProjects.list,
        productionProjectsPagination: state.productionProjects.pagination,
    };
};

export default connect(mapStateToProps, null)(ProductionProjectsList);

