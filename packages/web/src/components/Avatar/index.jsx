const Avatar = ({ src, size }) => (
  <>
    {src ? (
      <div style={{ width: size, minHeight: size, minWidth: size }}>
        <img
          src={src}
          width={size}
          height={size}
          alt=""
          style={{ objectFit: "cover", minHeight: size, maxHeight: size }}
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
