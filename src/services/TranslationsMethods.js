import store from '../stores/store'


let TranslationsMethods = {
    ReturnValue: (col, translations, standerValue) => {
        let states = store.getState()
        let lang = states.settings.locale.lang
        let value = standerValue
        if (lang !== 'ar') {
            if (translations) {
                translations.forEach((trg) => {
                    if (trg.column_name == col) {
                        value = trg.value
                    }
                })
            }

        }
        return value;
    },
    ReturnIconArrowNav:() => {
        let states = store.getState()
        let lang = states.settings.locale.lang
        let icon = "arrow-forward"
        if(lang == "ar") {
            icon = "arrow-forward"
        }else {
            icon = "arrow-back"
        }
        return icon
    },
    ReturnIconArrowSettings:() => {
        let states = store.getState()
        let lang = states.settings.locale.lang
        let icon = "arrow-ios-back-outline"
        if(lang == "ar") {
            icon = "arrow-ios-back-outline"
        }else {
            icon = "arrow-ios-forward-outline"
        }
        return icon
    },
    ReturnFont:(fontType = "Normal") => {
        let states = store.getState();
        let lang = states.settings.locale.lang
        let font = ""
        if(fontType == "Bold") {
            font = lang == "ar"?"CairoBold":"openSansBold"
        }else {
            font = lang == "ar"?"Cairo":"OpenSans"
        }
        return font
    },
    ReturnBottomTitle:(title) => {
        let t = ""
        let states = store.getState();
        let lang = states.settings.locale.lang
        if(title == "home") {
            t = lang == "ar"?"الرئيسية":"Main"
        }
        if(title == "MyOrders") {
            t = lang == "ar"?"طلباتي":"My Orders"
        }
        if(title == "Wishlist") {
            t = lang == "ar"?"المفضلة":"Wishlist"
        }
        if(title == "Settings") {
            t = lang == "ar"?"الأعدادات":"Settings"
        }

        return t;
    }
}

export default TranslationsMethods;