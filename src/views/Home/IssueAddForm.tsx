const IssueAddForm = (): JSX.Element => {
  return (
    <div>
      <form>
        <input type="text" placeholder="Owner" />
        <input type="text" placeholder="Title" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default IssueAddForm;
