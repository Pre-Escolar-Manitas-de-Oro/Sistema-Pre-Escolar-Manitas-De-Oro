exports.Get404 = (req, res, next) => {

    res.status(404).render("", { pageTitle: "Not found" });


};
``