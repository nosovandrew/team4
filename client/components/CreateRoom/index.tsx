import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { RouteComponentProps, withRouter } from 'react-router';
import b_ from 'b_';

import Input from '../Input';
import Button from '../Button';
import UsersList from '../UsersList';
import Popup from '../Popup';
import Head from './Head';

import './CreateRoom.css';
import UiStore from '../../domain/ui-store';
import contactsStore from '../../domain/contacts-store';
import chatsStore from '../../domain/chats-store';
import usersStore from '../../domain/users-store';

const b = b_.with('createRoom');

@observer
class CreateRoom extends React.Component<RouteComponentProps<{}>> {

    private static closePopup() {
        UiStore.togglePopup('createRoom')();
    }

    @observable
    private step: number = 1;

    @observable
    private name: string = '';

    @observable
    private members: string[] = [];

    public render(): React.ReactNode {
        const disabled = this.name.length === 0 && this.members.length === 0;

        return (
            <React.Fragment>
                <Popup
                    className={b()}
                    zIndex={100}
                    headContent={<Head closeHandler={CreateRoom.closePopup}/>}
                    closeHandler={CreateRoom.closePopup}
                >
                    <div className={b('inner')}>
                        {this.renderStepOne()}
                        {this.renderStepTwo()}
                        <Button disabled={disabled} onClick={this.createGroup}>
                            Создать группу
                        </Button>
                    </div>
                </Popup>
            </React.Fragment>
        );
    }

    private renderStepOne() {
        return (
            <label className={b('field')}>
                <span className={b('field-label')}>Название беседы:</span>
                <Input
                    onChange={this.changeName}
                    type={'text'}
                    placeholder={'Введите тему беседы'}
                />
            </label>
        )
    }

    private renderStepTwo() {
        const availableMembers = contactsStore.list.filter(
            contact => contact.id !== usersStore.currentUser.id
        );

        return (
            <div className={b('field')}>
                <span className={b('field-label')}>Участники:</span>
                <UsersList
                    searchType={'plain'}
                    users={availableMembers}
                    onClick={this.toggleMember}
                    selected={this.members}
                />
            </div>
        );
    }

    private changeName = (event) => {
        event.preventDefault();
        this.name = event.currentTarget.value;
    }

    private toggleMember = (id: string) => {
        if (this.members.includes(id)) {
            this.members = this.members.filter(idx => idx !== id);
            return;
        }

        this.members.push(id);
    }

    private createGroup = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (this.name.length === 0 && this.members.length === 0) {
            return;
        }

        const chat = await chatsStore.createChat('room', this.members, this.name, usersStore.currentUser.id);
        this.props.history.push(`/chats/${chat.id}`);
        CreateRoom.closePopup();
    }
}

export default withRouter(CreateRoom);
