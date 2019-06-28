import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import moment from 'moment';
moment.locale('nl');

class ParticipantsListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightRow: '',
        };
    }

    onRowEnter() {
        this.setState({
            showActionButtons: true,
            highlightRow: 'highlight-row',
        });
    }

    onRowLeave() {
        this.setState({
            showActionButtons: false,
            highlightRow: '',
        });
    }

    openItem(id) {
        hashHistory.push(`/project/deelnemer/${id}`);
    }

    render() {
        const { id, contact, participationsDefinitive, uniqueMutationStatuses, dateRegister, project } = this.props;
        const primaryAddress = contact.primaryAddress;
        let street = '';
        let number = '';
        let addition = '';

        if (primaryAddress) {
            primaryAddress.street && (street = primaryAddress.street);
            primaryAddress.number && (number = primaryAddress.number);
            primaryAddress.addition && (addition = primaryAddress.addition);
        }

        return (
            <tr
                className={this.state.highlightRow}
                onDoubleClick={() => this.openItem(id)}
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                {this.props.showCheckboxList ? (
                    <td>
                        {this.props.checkedAll && <input type="checkbox" checked />}
                        {!this.props.checkedAll && contact.primaryEmailAddress && (
                            <input type="checkbox" name={id} onChange={this.props.toggleParticipantCheck} />
                        )}
                        {!this.props.checkedAll && !contact.primaryEmailAddress && (
                            <input type="checkbox" name={id} onChange={this.props.toggleParticipantCheckNoEmail} />
                        )}
                    </td>
                ) : null}
                <td>{contact.type ? contact.type.name : ''}</td>
                <td>{contact.fullName}</td>
                <td>{primaryAddress ? street + ' ' + number + addition : ''}</td>
                <td>{contact.primaryAddress ? contact.primaryAddress.postalCode : ''}</td>
                <td>{contact.primaryAddress ? contact.primaryAddress.city : ''}</td>
                <td>{project ? project.name : ''}</td>
                <td>{participationsDefinitive ? participationsDefinitive : ''}</td>
                <td>{uniqueMutationStatuses.map(item => item.name).join(', ')}</td>
                <td>{dateRegister ? moment(dateRegister).format('L') : ''}</td>
                <td>
                    {contact.primaryContactEnergySupplier
                        ? contact.primaryContactEnergySupplier.energySupplier.name
                        : ''}
                </td>
                <td>
                    {this.state.showActionButtons ? (
                        <a role="button" onClick={() => this.openItem(id)}>
                            <span className="glyphicon glyphicon-pencil mybtn-success" />{' '}
                        </a>
                    ) : (
                        ''
                    )}
                </td>
            </tr>
        );
    }
}

export default ParticipantsListItem;
