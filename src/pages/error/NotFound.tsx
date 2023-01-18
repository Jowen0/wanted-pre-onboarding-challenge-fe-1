import { useNavigate } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

// Component
import Button from "component/atom/Button";
import { PAGE_URL } from "type/common";

 // https://colorlib.com/wp/free-404-error-page-templates/
 
const NotFoundStyle = createGlobalStyle`
*{-webkit-box-sizing:border-box;box-sizing:border-box}

body{padding:0;margin:0}
#notfound{position:relative;height:100vh}

#notfound .notfound{position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}
.notfound{max-width:520px;width:100%;line-height:1.4;text-align:center}
.notfound .notfound-404{position:relative;height:240px}
.notfound .notfound-404 h1{font-family:montserrat,sans-serif;position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%);font-size:252px;font-weight:900;margin:0;color:#262626;text-transform:uppercase;letter-spacing:-40px;margin-left:-20px}
.notfound .notfound-404 h1>span{text-shadow:-8px 0 0 #fff}
.notfound .notfound-404 h3{font-family:cabin,sans-serif;position:relative;font-size:16px;font-weight:700;text-transform:uppercase;color:#262626;margin:0;letter-spacing:3px;padding-left:6px}
.notfound h2{font-family:cabin,sans-serif;font-size:20px;font-weight:400;text-transform:uppercase;color:#000;margin-top:0;margin-bottom:25px}
@media only screen and (max-width:767px){.notfound .notfound-404{height:200px}
.notfound .notfound-404 h1{font-size:200px}
}
@media only screen and (max-width:480px){.notfound .notfound-404{height:162px}
.notfound .notfound-404 h1{font-size:162px;height:150px;line-height:162px}
.notfound h2{font-size:16px}
}
`

const NotFound = () => {

    const navigation = useNavigate();

    return (
        <>
            <NotFoundStyle />
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h3>Oops! Page not found</h3>
                        <h1><span>4</span><span>0</span><span>4</span></h1>
                    </div>
                    <h2>we are sorry, but the page you requested was not found</h2>
                    <h2>Click here to go Home</h2>
                    <Button text="Go Home" width="150px" backgroundColor="#b6ffb6" onClick={() => navigation(PAGE_URL.TODO)} />
                </div>
            </div>
        </>
    );
}


export default NotFound;