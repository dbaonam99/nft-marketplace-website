const Avatar = ({ src, size }) => (
  <>
    {src ? (
      <img src={src} width={size} height={size} alt="" />
    ) : (
      <div
        style={{
          minWidth: size,
          width: size,
          height: size,
          background: "#DDD",
          borderRadius: "100%",
        }}
      />
    )}
  </>
);

export default Avatar;
