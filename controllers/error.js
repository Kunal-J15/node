exports.get404 = (req, res, next) => {
  console.log(req.baseUrl);
  res.status(404).render('404', { pageTitle: 'Page Not Found', path: '/404' ,msg:req.method+" "+ req.baseUrl});
};
