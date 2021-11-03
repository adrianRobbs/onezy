import nextConnect from "next-connect";

export default nextConnect({
  onError(error, req, res) {
    res.statusCode = 500;
    res.json({ error: { message: "Server Error" } });
  },
  onNoMatch(req, res) {
    res.statusCode = 404;
    res.json({ error: { message: "Resource Not Found" } });
  },
});
