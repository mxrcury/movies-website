import { Form, Field } from 'react-final-form'
import { FormBase, Input,ShareLink, Button, Subtitle, FlexContainer,ModalButton } from './styles';
import Modal from '../Modal';
import { FormattedMessage } from 'react-intl';
import { Context } from './../../providers/context/context';
import { useContext } from 'react';


const SelectedMoviesForm = ({onSubmit,shareLink, modal, onSaveMovieList}) => {

  const { state } = useContext(Context)

  return (
    <>
      <Form
        onSubmit={onSubmit}
        validate={(values) => {
          const errors = {};
          if (!values.listName) {
            errors.listName = "Required";
          }
          return errors;
        }}
        render={({ handleSubmit }) => (
          <FormBase onSubmit={handleSubmit}>
            <Field name="listName">
              {({ input, meta }) => (
                <>
                  <Input
                    type="text"
                    placeholder="Write a title..."
                    {...input}
                  />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </>
              )}
            </Field>
            <Button
              color="secondary"
              variant="contained"
              sx={{ marginRight: "10px" }}
              type="submit"
            >
              <FormattedMessage id='buttons.share'/>
            </Button>
          </FormBase>
        )}
      />
      {modal.state ? (
        <Modal onClose={modal.toggle}>
          <Subtitle><FormattedMessage id='modal.generatedLink' /></Subtitle>
          <FlexContainer>
            <ModalButton
              color="secondary"
              variant="contained"
              onClick={() => {
                modal.toggle()
                navigator.clipboard.writeText(shareLink)
              }}
            >
              <FormattedMessage id='buttons.copyLink'/>
            </ModalButton>
            {!state.saveLists ?
            <ModalButton
              color="secondary"
              variant="contained"
              onClick={onSaveMovieList}
            >
              <FormattedMessage id='buttons.save'/>
            </ModalButton>
             : null }
          </FlexContainer>
        </Modal>
      ) : null}
    </>
  );
}

export default SelectedMoviesForm
