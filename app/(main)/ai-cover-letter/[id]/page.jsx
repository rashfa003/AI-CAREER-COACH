const CoverLetterPage = async({ params }) => {
    const id = await params.id;
  return  <div> CoverLetterPage: {id}</div>;
};

export default CoverLetterPage;