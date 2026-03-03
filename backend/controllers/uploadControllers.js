exports.uploadAvatar = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  }
  
  const port = process.env.PORT || 5000;
  const fileUrl = `http://localhost:${port}/uploads/${req.file.filename}`;
  
  res.json({ avatarUrl: fileUrl });
};