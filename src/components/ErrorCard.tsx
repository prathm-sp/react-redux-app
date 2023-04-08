function ErrorCard({ errors }: any) {
  if (!errors || !Object.keys(errors).length) {
    return null;
  }
  const errorMsgArr = Object.keys(errors)
    .map((e) => errors[e].message || "")
    .filter((o) => Boolean(o));

  return (
    <>
      {errorMsgArr?.length ? (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          {errorMsgArr.map((msg, i) => (
            <p
              key={`error-msg-${i}`}
              className="text-base mb-1 font-semibold block"
            >
              • {msg}
            </p>
          ))}
        </div>
      ) : null}
    </>
  );
}

export default ErrorCard;
