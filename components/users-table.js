// @flow
import type { State, Dispatch, User, UserForm } from '../types';
import Box from '../components/box';
import Button from '../components/button';
import AlertErrors from '../components/alert-errors';
import Checkbox from '../components/checkbox';
import Heading from '../components/heading';
import P from '../components/p';
import Set from '../components/set';
import Text from '../components/text';
import TextInput from '../components/text-input';
import { connect } from 'react-redux';

// This is pretty fast editable lists. Just follow this two simple rules:
// 1) Do not nest the same redux connect selected states.
// 2) For huge lists, use react-virtualized.

type RowFormProps = {
  data: *,
  changed: *,
  field: 'select' | 'name' | 'likesCats' | 'likesDogs',
  selected: *,
  dispatch: Dispatch,
  appError: *,
  validationErrors: *,
  disabled: *,
};

const RowForm = ({
  data,
  changed,
  field,
  selected,
  dispatch,
  appError,
  validationErrors,
  disabled,
}: RowFormProps) => {
  const user: User = { ...data, ...changed };
  const set = (prop: $Keys<UserForm>) => value => {
    dispatch({
      type: 'SET_USER_FORM',
      id: user.id,
      // $FlowFixMe
      form: { ...user, [prop]: value },
    });
  };
  const toggleUsersSelection = () => {
    dispatch({ type: 'TOGGLE_USERS_SELECTION', users: [user] });
  };
  const saveUser = () => {
    dispatch({ type: 'SAVE_USER', user });
  };
  const cancelEditation = () => {
    dispatch({ type: 'SET_USER_FORM', id: user.id, form: null });
  };
  const onNameKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        saveUser();
        break;
      case 'Escape':
        cancelEditation();
        break;
    }
  };
  const renderField = () => {
    switch (field) {
      case 'select':
        return (
          <Checkbox
            alignItems="center"
            height={1}
            opacity={selected ? 1 : 0.25}
            onChange={toggleUsersSelection}
            value={selected}
            disabled={disabled}
          />
        );
      case 'name':
        return (
          <TextInput
            borderBottomWidth={1}
            borderColor="gray"
            borderStyle="solid"
            maxLength={100}
            onChange={set('name')}
            onKeyDown={onNameKeyDown}
            value={user[field]}
            width={10}
            disabled={disabled}
          />
        );
      case 'likesCats':
      case 'likesDogs':
        return (
          <Checkbox
            alignItems="center"
            height={1}
            onChange={set(field)}
            value={user[field]}
            disabled={disabled}
          />
        );
      default:
        return null;
    }
  };
  const renderEditActions = () =>
    <Box height={1}>
      {field === 'name' &&
        <Set flexWrap="nowrap">
          <Button
            color="primary"
            size={-1}
            height={1}
            marginVertical={0}
            onPress={saveUser}
            paddingHorizontal={0}
            disabled={disabled}
          >
            save
          </Button>
          <Button
            color="warning"
            size={-1}
            marginVertical={0}
            onPress={cancelEditation}
            paddingHorizontal={0}
            disabled={disabled}
          >
            cancel
          </Button>
          <AlertErrors
            appError={appError}
            validationErrors={validationErrors}
          />
        </Set>}
    </Box>;

  return (
    <Box>
      <Box height={2} paddingVertical={0.5}>
        {renderField()}
      </Box>
      {changed && renderEditActions()}
    </Box>
  );
};

const ConnectedRowForm = connect(
  ({ users: { form, selected } }: State, { data: { id } }) => ({
    changed: form.changed[id],
    selected: selected[id],
    appError: form.appError[id],
    validationErrors: form.validationErrors[id],
    disabled: form.disabled[id],
  }),
)(RowForm);

type DeleteSelectedProps = {
  selected: *,
  dispatch: Dispatch,
};

const DeleteSelected = ({ selected, dispatch }: DeleteSelectedProps) =>
  <Button
    color="warning"
    disabled={Object.keys(selected).length === 0}
    size={-1}
    onPress={() => dispatch({ type: 'DELETE_SELECTED_USERS' })}
    paddingHorizontal={0}
    marginVertical={0}
  >
    Delete Selected
  </Button>;

const ConnectedDeleteSelected = connect(({ users }: State) => ({
  selected: users.selected,
}))(DeleteSelected);

type ToggleUsersSelectionProps = {
  selected: *,
  users: *,
  dispatch: Dispatch,
};

const ToggleUsersSelection = ({
  selected,
  users,
  dispatch,
}: ToggleUsersSelectionProps) =>
  <Checkbox
    alignItems="center"
    opacity={0.25}
    onChange={() => dispatch({ type: 'TOGGLE_USERS_SELECTION', users })}
    value={users.every(user => selected[user.id])}
  />;

const ConnectedToggleUsersSelection = connect(({ users }: State) => ({
  selected: users.selected,
}))(ToggleUsersSelection);

const Column = ({ header, field, users }) =>
  <Box>
    <Box height={2} paddingVertical={0.5}>
      {typeof header === 'string'
        ? <Text bold style={{ whiteSpace: 'nowrap' }}>
            {header}
          </Text>
        : header}
    </Box>
    {users.map(user =>
      <ConnectedRowForm field={field} data={user} key={user.id} />,
    )}
  </Box>;

const EmptyTable = () =>
  <Text italic>Some friendly empty table message here...</Text>;

// Yep, this is a table without <table>. The table layout below is created
// with Flexbox only. React Native (https://facebook.github.io/yoga) does
// not support table layout anyway. Tableless tables allow us to do fancy
// things. For example:
// https://bvaughn.github.io/react-virtualized/#/components/Table
// The only caveat: Row can not have dynamic height. Still it can have reserved
// rhythm vertical space, for example one ad-hoc line for action buttons.
// For sophisticated validation errors, we can use some popup Alert component.
// For mobiles, we have no other choice anyway.
const UsersTable = ({ users }) => {
  const sortedUsers = Object.keys(users)
    .map(id => users[id])
    .sort((a, b) => a.createdAt - b.createdAt)
    .reverse();

  return (
    <Box>
      <Heading size={2}>A table made from Flexbox only</Heading>
      <P>
        Note it's fast even with hundred of rows. How? Just two rules. Do not
        nest connected selected states. And for very long lists, use
        react-virtualized.
      </P>
      {sortedUsers.length === 0
        ? <EmptyTable />
        : <Box>
            <ConnectedDeleteSelected />
            <Set spaceBetween={1} flexWrap="nowrap">
              {/* Set can be nested for custom spaceBetween */}
              <Set spaceBetween={0.5} flexWrap="nowrap">
                <Column
                  header={<ConnectedToggleUsersSelection users={sortedUsers} />}
                  field="select"
                  users={sortedUsers}
                />
                <Column header="Name" field="name" users={sortedUsers} />
              </Set>
              <Column header="🐈" field="likesCats" users={sortedUsers} />
              <Column header="🐕" field="likesDogs" users={sortedUsers} />
            </Set>
          </Box>}
    </Box>
  );
};

export default connect(({ users }: State) => ({ users: users.local }))(
  UsersTable,
);
