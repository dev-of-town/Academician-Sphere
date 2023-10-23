import styles from "../_css/createPost.module.css";

export default function Content_post() {
  return (
    <div
      id="postFile"
      className={`${styles.dragArea} m-3 `}
      ondragover="return false"
      style={{ width: "95%" }}
    >
      <div className="icon">
        <i className="fas fa-cloud-upload-alt"></i>
      </div>
      <div className="text-secondary fw-bold"> Drag & Drop to Upload File</div>
      <div className="text-secondary fw-bold">OR</div>
      <button>Browse File</button>
      <input
        type="file"
        name="file"
        id="file"
        accept="image/png,image/gif,image/jpeg,image/webp,video/mp4,video/quicktime"
        hidden
      />
    </div>
  );
}
