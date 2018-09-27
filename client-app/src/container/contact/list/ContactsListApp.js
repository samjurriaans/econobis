import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty } from 'lodash';
import moment from 'moment';

moment.locale('nl');

import { fetchContacts, clearContacts, setCheckedContactAll } from '../../../actions/contact/ContactsActions';
import { setTypeFilter, clearFilterContacts } from '../../../actions/contact/ContactsFiltersActions';
import { setContactsPagination } from '../../../actions/contact/ContactsPaginationActions';
import { blockUI, unblockUI } from '../../../actions/general/BlockUIActions';
import ContactsList from './ContactsList';
import ContactsListToolbar from './ContactsListToolbar';
import filterHelper from '../../../helpers/FilterHelper';
import ContactsAPI from '../../../api/contact/ContactsAPI';
import fileDownload from "js-file-download";
import {hashHistory} from "react-router";
import ContactsListSaveAsGroup from "./ContactsListSaveAsGroup";
import ContactsListExtraFilters from "./ContactsListExtraFilters";

class ContactsListApp extends Component {
    constructor(props) {
        super(props);
        if (!isEmpty(props.params)) {
            switch (props.params.filter) {
                case 'type':
                    this.props.clearFilterContacts();
                    this.props.setTypeFilter(props.params.value);
                    break;
                default:
                    break;
            };
        }

        this.state = {
            showCheckboxList: false,
            checkedAllCheckboxes: false,
            showSaveAsGroup: false,
            showExtraFilters: false,
            filterType: 'and',
            amountOfFilters: 0,
            extraFilters: [],
        };

        this.handlePageClick = this.handlePageClick.bind(this);
        this.handleExtraFiltersChange = this.handleExtraFiltersChange.bind(this);
        this.getCSV = this.getCSV.bind(this);
        this.toggleShowExtraFilters = this.toggleShowExtraFilters.bind(this);
    }

    componentDidMount() {
        this.fetchContactsData();
    };

    componentWillReceiveProps(nextProps) {
        if(this.props.params.value !== nextProps.params.value){
            if(!isEmpty(nextProps.params)) {
                switch(nextProps.params.filter){
                    case 'type':
                        this.props.clearFilterContacts();
                        this.props.setTypeFilter(nextProps.params.value);
                        break;
                    default:
                        break;
                };
            }
            else {
                this.props.clearFilterContacts();
            }

            setTimeout(() => {
                this.fetchContactsData();
            }, 100);
        }
    }

    componentWillUnmount() {
        this.props.clearContacts();
    };

    fetchContactsData = () => {
        setTimeout(() => {
            const extraFilters = this.state.extraFilters;
            const filters = filterHelper(this.props.contactsFilters);
            const sorts = this.props.contactsSorts;
            const pagination = { limit: 20, offset: this.props.contactsPagination.offset };
            const filterType = this.state.filterType;

            this.props.fetchContacts(filters, extraFilters, sorts, pagination, filterType);
        },100 );
    };

    saveAsGroup = () => {
        const extraFilters = this.state.extraFilters;
        const filters = filterHelper(this.props.contactsFilters);
        const filterType = this.state.filterType;

        ContactsAPI.saveAsGroup({filters, extraFilters, filterType}).then((payload) => {
            hashHistory.push(`/contact-groep/${payload.data.data.id}/edit`);
        });
    };

    toggleSaveAsGroup = () => {
        this.setState({
            showSaveAsGroup: !this.state.showSaveAsGroup
        });
    };

    getCSV = () => {
        this.props.blockUI();
        setTimeout(() => {
            const extraFilters = this.state.extraFilters;
            const filters = filterHelper(this.props.contactsFilters);
            const sorts = this.props.contactsSorts;

                ContactsAPI.getCSV({filters, extraFilters, sorts}).then((payload) => {
                    fileDownload(payload.data, 'Contacten-' + moment().format("YYYY-MM-DD HH:mm:ss") +  '.csv');
                    this.props.unblockUI();
                }).catch((error) => {
                    this.props.unblockUI();
              });
        },100 );
    };

    resetContactFilters = () => {
        this.props.clearFilterContacts();

        this.setState({
            filterType: 'and',
            amountOfFilters: 0,
            extraFilters: [],
        });

        this.fetchContactsData();
    };

    onSubmitFilter() {
        this.props.clearContacts();

        this.props.setContactsPagination({page: 0, offset: 0});

        this.fetchContactsData();
    };

    handlePageClick(data) {
        let page = data.selected;
        let offset = Math.ceil(page * 20);

        this.props.setContactsPagination({page, offset});

        this.fetchContactsData();
    };

    toggleShowCheckboxList = () => {
        this.setState({
            showCheckboxList: !this.state.showCheckboxList
        });
    };

    selectAllCheckboxes = () => {
        this.setState({
            checkedAllCheckboxes: !this.state.checkedAllCheckboxes
        });

        this.props.setCheckedContactAll(!this.state.checkedAllCheckboxes);
    };

    handleExtraFiltersChange(extraFilters, amountOfFilters, filterType) {
        this.setState({
            filterType: filterType,
            amountOfFilters: extraFilters,
            extraFilters: extraFilters
        });

        this.props.setContactsPagination({page: 0, offset: 0});

        setTimeout(() => {
            this.fetchContactsData();
        },100 );
    }

    prefillExtraFilter() {
        this.setState({
            filterType: 'and',
            amountOfFilters: 1,
            extraFilters:  [{
                field: 'name',
                type: 'eq',
                data: '',
            }],
        });
    };

    toggleShowExtraFilters() {
        this.state.extraFilters.length === 0 &&
        !this.state.showExtraFilters &&
        this.prefillExtraFilter();

        this.setState({
            showExtraFilters: !this.state.showExtraFilters,
            amountOfFilters: this.state.extraFilters.length,
        });
    };

    render() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="col-md-12 margin-10-top">
                            <ContactsListToolbar
                                toggleShowCheckboxList={() => this.toggleShowCheckboxList()}
                                resetContactFilters={() => this.resetContactFilters()}
                                selectAllCheckboxes={() => this.selectAllCheckboxes()}
                                checkedAllCheckboxes={this.state.checkedAllCheckboxes}
                                getCSV={this.getCSV}
                                toggleSaveAsGroup={this.toggleSaveAsGroup}
                                saveAsGroup={this.saveAsGroup}
                                toggleShowExtraFilters={this.toggleShowExtraFilters}
                            />
                        </div>

                        <div className="col-md-12 margin-10-top">
                            <ContactsList
                                contacts={this.props.contacts}
                                contactsPagination={this.props.contactsPagination}
                                showCheckboxList={this.state.showCheckboxList}
                                selectAllCheckboxes={() => this.selectAllCheckboxes()}
                                checkedAllCheckboxes={this.state.checkedAllCheckboxes}
                                onSubmitFilter={() => this.onSubmitFilter()}
                                fetchContactsData={() => this.fetchContactsData()}
                                handlePageClick={this.handlePageClick}
                            />
                        </div>
                    </div>
                </div>
                {this.state.showSaveAsGroup &&
                <ContactsListSaveAsGroup
                 saveAsGroup={this.saveAsGroup}
                 closeDeleteItemModal={this.toggleSaveAsGroup}
                />
                }
                {
                    this.state.showExtraFilters &&
                    <ContactsListExtraFilters
                        saveAsGroup={this.saveAsGroup}
                        filterType={this.state.filterType}
                        toggleShowExtraFilters={this.toggleShowExtraFilters}
                        handleExtraFiltersChange={this.handleExtraFiltersChange}
                        extraFilters={this.state.extraFilters}
                        amountOfFilters={this.state.amountOfFilters}
                    />
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        contacts: state.contacts.list,
        contactsFilters: state.contacts.filters,
        contactsSorts: state.contacts.sorts,
        contactsPagination: state.contacts.pagination,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchContacts, clearContacts, setCheckedContactAll, setTypeFilter, clearFilterContacts, setContactsPagination, blockUI, unblockUI }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsListApp);