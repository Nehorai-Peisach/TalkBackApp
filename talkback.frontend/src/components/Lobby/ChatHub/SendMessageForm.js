import { useState } from "react"
import { FormControl, InputGroup, Button, Form, FormGroup } from "react-bootstrap"

const SendMessageForm = ({ sendMessage }) => {

    const [message,setMessage] = useState();

    return <Form onSubmit={e => {
            e.preventDefault();
            sendMessage(message);
            setMessage('');}}>
        <FormGroup>
            <InputGroup>
                <FormControl placeholder='message...'
                onChange={e => setMessage(e.target.value)} value={message}/>
                    <Button variant='primary' type='submit'
                    disabled={!message}>Send</Button>
            </InputGroup>
        </FormGroup>
    </Form>
}

export default SendMessageForm;