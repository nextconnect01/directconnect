import express from "express"
import passport from "passport"

const router = express.Router()

router.get(
    "/google",
    passport.authenticate("google",{scope : ["profile","email"]})
)

router.get(
    "/google/callback",
    passport.authenticate("google",{failureRedirect :"/login"}),
    (req,res) => {
        res.redirect(`${process.env.CLIENT_URL}/dashboard?user=${JSON.stringify(req.user)}`)
    }
)

router.get("/logout",(req,res) => {
    req.logout((err) => {
        if(err){
            console.log("Error logging out :",err);
            return res.status(500).json({message : "Logout Failed "})
            
        }
        req.session.destroy((err) => {
            if (err) console.log("Error destroying session:", err);
            res.clearCookie("connect.sid");
            console.log("Session destroyed and cookie cleared");
            res.redirect(`${process.env.CLIENT_URL}`);
        });
    })
})

export default router;
