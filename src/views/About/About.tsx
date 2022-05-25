import useAbout from 'hooks/useAbout';

const dataStyle = {
  color: '#e7c36c',
};

const About = (): JSX.Element => {
  const { loading, error, data } = useAbout();

  if (loading)
    return (
      <div className="mt-10 flex items-center justify-center">Loading...</div>
    );
  if (error) throw new Error('test');

  return (
    <div className="mx-3 mt-5">
      <h1 className="underline mb-4 text-5xl">About</h1>
      <p>This template uses GraphQL architecture to interface with an API</p>
      <br />
      <p>
        There is a companion NodeJS project to this template that provides the
        backend application. This adheres to a MERN stack. A RESTful
        acrchitecture will be setup as well.
      </p>
      <br />
      <p>
        This specific component utilizes React Query and the Apollo Client to
        render both loading and error states as well. If this page rendered then
        the request to the API did not error at least.
      </p>
      <br />
      <p>
        Returned message from API:{' '}
        <span style={dataStyle} id="api-data" className="italic">
          ${data.about}
        </span>
      </p>
    </div>
  );
};

export default About;
