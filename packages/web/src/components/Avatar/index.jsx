const Avatar = ({ src, size }) => (
  <>
    {src ? (
      <div style={{ minWidth: size }}>
        <img
          src={src}
          width={size}
          height={size}
          alt=""
          style={{ objectFit: "cover" }}
        />
      </div>
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
