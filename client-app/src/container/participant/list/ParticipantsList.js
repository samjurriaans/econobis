import React, { Component } from 'react';

import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import ParticipantsListHead from './ParticipantsListHead';
import ParticipantsListFilter from './ParticipantsListFilter';
import ParticipantsListItem from './ParticipantsListItem';
import DataTablePagination from '../../../components/dataTable/DataTablePagination';
import { connect } from 'react-redux';

class ParticipantsList extends Component {
    constructor(props) {
        super(props);
    }

    // On key Enter filter form will submit
    handleKeyUp = e => {
        if (e.keyCode === 13) {
            this.props.onSubmitFilter();
        }
    };

    render() {
        const { data = [], meta = {} } = this.props.participantsProductionProject;

        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van participanten.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (data.length === 0) {
            loadingText = 'Geen participanten gevonden!';
        } else {
            loading = false;
        }

        return (
            <form onKeyUp={this.handleKeyUp}>
                <DataTable>
                    <DataTableHead>
                        <ParticipantsListHead
                            refreshParticipantsProductionProjectData={() =>
                                this.props.refreshParticipantsProductionProjectData()
                            }
                        />
                        <ParticipantsListFilter
                            onSubmitFilter={this.props.onSubmitFilter}
                            toggleCheckedAll={this.props.toggleCheckedAll}
                            showCheckboxList={this.props.showCheckboxList}
                            checkedAll={this.props.checkedAll}
                            productionProjects={this.props.productionProjects}
                        />
                    </DataTableHead>
                    <DataTableBody>
                        {loading ? (
                            <tr>
                                <td colSpan={12}>{loadingText}</td>
                            </tr>
                        ) : (
                            data.map(participantProductionProject => {
                                return (
                                    <ParticipantsListItem
                                        key={participantProductionProject.id}
                                        showCheckboxList={this.props.showCheckboxList}
                                        checkedAll={this.props.checkedAll}
                                        toggleParticipantCheck={this.props.toggleParticipantCheck}
                                        toggleParticipantCheckNoEmail={this.props.toggleParticipantCheckNoEmail}
                                        {...participantProductionProject}
                                    />
                                );
                            })
                        )}
                    </DataTableBody>
                </DataTable>
                <div className="col-md-4 col-md-offset-4">
                    <DataTablePagination
                        onPageChangeAction={this.props.handlePageClick}
                        totalRecords={meta.total}
                        initialPage={this.props.participantsProductionProjectPagination.page}
                    />
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

export default connect(mapStateToProps)(ParticipantsList);
