export const uploadImage = (img, cb) => {
  if (img != null) {
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "imagesStore");
    data.append("cloud_name", "dkqjm9avx");

    return fetch("https://api.cloudinary.com/v1_1/dkqjm9avx/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        cb(data.url, true);
      })
      .catch((err) => {
        cb("", false);
      });
  }
};
