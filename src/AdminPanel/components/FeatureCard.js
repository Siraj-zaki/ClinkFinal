import React from 'react';
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom';
import defaultImage from "../assets/featureImg.png";

export default ({ item, containerWidth }) => {

    const { t } = useTranslation()

    let resWidth = parseInt(containerWidth.slice(0, 3))

    const resPercent = (val) => {
        return resWidth * val / 100
    }

    const productDetail = () => {
        window.location.href = "/detail?id=" + item.itemID
    }

    return (
        <Link to={"/detail?id=" + item.itemID} id='dev' className="asd" style={{ display: 'flex', width: containerWidth, marginBottom: 30, }}>
            <img className='feature-img' style={{ width: '60%', zIndex: 1, height: resWidth * 60 / 100, }}
                src={item.imgUrl || defaultImage}
                alt={'image'}
            />


            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: -10, justifyContent: 'flex-end', }}>
                <text style={{ paddingLeft: 30, alignSelf: 'flex-start',color:'#000', }} >{i18n.language === 'en' ? item.itemName : item.itemNameArabic}</text>
                <text style={{ paddingLeft: 30, marginBottom: 20,color:'#000', alignSelf: 'flex-start', }}  >{i18n.language === 'en' ? item.categoryName : item.categoryNameArabic}</text>
                <div style={{
                    background: '#960200', height: '55px', borderRadius: 10,
                    borderTopLeftRadius: 0, borderBottomLeftRadius: 0, paddingLeft: 30,
                    display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                }}>

                    <span className="btns-new" style={{ fontSize: resPercent(5), color: "white", paddingRight: 10 }}>{t("Price")}</span>
                    <span className="btns-new" style={{ fontSize: resPercent(6), color: "white", paddingRight: 20 }}>${item.itemPrice}</span>

                </div>
            </div>

        </Link >

    )
}

