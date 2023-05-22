
import classes from './Settings.module.css';
import vector from './img/vector.png'
import vector2 from './img/vector2.png'
import setting_gear from './img/settings_gear.png'
function Settings(props) {
    return (
        <form className={classes.settings} >
            <header className={classes.header}></header>
            <div className={classes.account_settings}>Account Settings</div>
            <img className={classes.account_settings_vector} src={vector} />

            <span className={classes.email_span}>Email</span>
            <input className={classes.email} value={props.loginData.email} />
            <img className={classes.account_email_vector} src={vector2} />


            <span className={classes.password_span}>Change Password</span>
            <input type='password' className={classes.password} value={props.loginData.password} />
            <img className={classes.account_password_vector} src={vector2} />

            <span className={classes.country_span}>Country Settings</span>
            <input className={classes.country} value={props.loginData.country_code} />

            <span className={classes.language_span}> Language</span>
            <input className={classes.language} value="English (UK)" />
            <img className={classes.account_language_vector} src={vector2} />


            <div className={classes.legal}>
            Legal
            </div>
            <div className={classes.privacy}>
                <img src={setting_gear} />
                <span>Privacy</span></div>
            <div className={classes.term_of_service}>
                <img src={setting_gear} />
                <span>Terms of Service</span></div>
            <div className={classes.logout}>
                <img src={setting_gear} />
                <span>Log out</span></div>
            <div className={classes.delete}>
                <img src={setting_gear} />
                <span>Delete Account</span> </div>

        </form>

    )
}

export default Settings