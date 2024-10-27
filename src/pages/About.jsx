/* eslint-disable react/jsx-key */
import React from "react";
import logo from "../assets/logo-white.svg";
import gameLook from "../assets/gameLook.png";
import avatar from "../assets/avatar1.png";
import prod1 from "../assets/prod1.png";
import prod2 from "../assets/prod2.png";
import prod3 from "../assets/prod3.png";
import prod4 from "../assets/prod4.png";
import products from "../../products.json";
import phone from "../assets/phone.svg";
import two from "../assets/two.svg";
import arrows from "../assets/arrows.svg";
import "./About.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
const About = () => {
  const navigator = useNavigate();

  const productsList = products.products.map((product, index) => {
    const images = [prod1, prod2, prod3, prod4];

    return (
      <div className="about-product" key={product.id}>
        <img src={images[index]} className="prod-img" alt={product.image} />
        <div className="prod-text-container">
          <p className="prod-text">{product.description}</p>
          <div className="buy-prod">
            <p className="prod-price">
              {product.price} <span className="kd">دك</span>
            </p>
            <Button type="prod" text="شراء" />
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className="about-page">
      <div className="hero-section orange-gradient ">
        <div className="logo-section">
          <img src={logo} className="logo-img" alt="logo" />
        </div>
        <h2 className="hero-title">الجواب عليك، و السؤال علينا</h2>
        <p className="hero-description">
          ٦ فئات، ٣٦ سؤال، و معاهم ٣ وسائل مساعدة
        </p>
        <div className="btn btn-row">
          <Button
            type="hero-section"
            text="واجهة الأطفال"
            isLarge={true}
            isBold={true}
          />
          <Link to="/select-categories">
            <Button
              text="إنشاء لعبة"
              type="secondary"
              isBold={true}
              isLarge={true}
            />
          </Link>
          <Link to="/game-history">
            <Button
              type="tenty"
              text="تصفح الألعاب"
              isLarge={true}
              isBold={true}
            />
          </Link>
        </div>
      </div>
      <div className="about-section">
        <div className="about-container">
          <div className="text-section">
            <h2 className="about-title">نبذة عن سين جيم</h2>
            <p className="about-description">
              لعبة جماعية ممتعة، تحتوي على ٦ فئات مختلفة و ٣٦ سؤال يختبر
              معلوماتكم، و عشان نضيف الحماس لليمعة ضفنا ٣ وسائل مساعدة لكل فريق،
              اختاروهم بعناية
            </p>
            <div className="row-circles">
              <div className="circle">
                <p className="circle-text">تحدي</p>
              </div>
              <div className="line"></div>
              <div className="circle">
                <p className="circle-text">ذكاء</p>
              </div>
              <div className="line"></div>
              <div className="circle">
                <p className="circle-text">متعة</p>
              </div>
              <div className="line"></div>
              <div className="circle">
                <p className="circle-text">ترفيه</p>
              </div>
            </div>
          </div>
          <img src={gameLook} className="game-look" alt="game-look" />
        </div>
        <div className="about-container">
          <img src={avatar} className="avatar" alt="game-look" />
          <div className="text-section">
            <h2 className="about-title">اختبر معلوماتك</h2>
            <p className="about-description">
              هي لعبة ثقافية ممتعة مناسبة لجميع الاعمار فيها تختبر معلومات
              يمعتكم، اللعبة تشمل جميع انواع الاسئلة حسب الفئة المختارة.
            </p>
            <Button text="إنشاء لعبة" type="secondary" isLarge={true} />
          </div>
        </div>
        <div className="about-sec-container">
          <div className="text-full-section">
            <h2 className="about-title">باقات الألعاب</h2>
            <div className="about-description-third">
              لكل مستخدم لعبة واحدة مجانية يمكنك من خلالها تجربة الفئات الموجودة
            </div>
            <div className="about-products">{productsList}</div>
          </div>
        </div>
        <div className="help-section">
          <p className="help-text">وسائل المساعدة</p>
          <div className="help-containers">
            <div className="help-container">
              <h2 className="help-title">اتصال بصديق</h2>
              <p className="help-description">
                صديقك اللي يعرف كل شي هذا وقته دق عليه !
              </p>
              <img className="help-img" src={phone} />
              <button className="btn btn-help">
                تستخدمها بعد ماتشوف السؤال
              </button>
            </div>
            <div className="help-container">
              <h2 className="help-title">جاوب جوابين</h2>
              <p className="help-description">
                !متردد بجوابين؟ هذي لك جاوب بالأثنين عشان تضمن النقاط
              </p>
              <img className="help-img" src={two} />
              <button className="btn btn-help">
                تستخدمها بعد ماتشوف السؤال
              </button>
            </div>
            <div className="help-container">
              <h2 className="help-title">الحفرة</h2>
              <p className="help-description">
                !احفر لهم جاوب صح، و اخصم عدد النقاط اللي فزت فيها من نقاط
                الفريق الثاني
              </p>
              <img className="help-img" src={arrows} />
              <button className="btn btn-help">
                تستخدمها بعد ماتشوف السؤال
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
