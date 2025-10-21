const ContactForm = () => {
  return <form>
    <label>Name: <input type="text" name="name" /></label>
    <label>Email: <input type="email" name="email" /></label>
    <button type="submit">Submit</button>
  </form>;
}

export default ContactForm;