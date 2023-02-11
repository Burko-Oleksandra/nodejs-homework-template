const fs = require("fs/promises");
const path = require("path");

const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateUrl = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalName } = req.file;
  const extention = originalName.split(".").pop();
  const fileName = `${_id}.$(extention)`;
  const resultUpload = path.join(avatarsDir, fileName);
  await fs.rename(tempUpload, resultUpload);
  const avatarUrl = path.join("avatars", fileName);
  await User.findByIdAndUpdate(_id, { avatarUrl });

  res.json({
    avatarUrl,
  });
};

module.exports = updateUrl;
