import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signin } from "redux/actions/auth";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const loginCheck = await dispatch(signin(data));
    if (loginCheck) {
      toast.success("Giris basarili, yonlendiriliyorsunuz...", {
        autoClose: 3000,
      });
      setTimeout(() => {
        history.push("/");
      }, 3000);
    } else {
      toast.error("Bilgilerinizi kontrol ediniz");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="mail">Email</label>
      <input
        id="mail"
        type="email"
        placeholder="Email"
        {...register("email", {
          required: true,
          pattern: /^\S+@\S+$/i,
        })}
        className={errors.email?.type ? "input-error" : ""}
      />
      {errors.email && errors.email.type === "required" && (
        <span style={{ marginTop: "8px" }} className="error-area">
          Bu Alan Boş Olamaz
        </span>
      )}
      {errors.email && errors.email.type === "pattern" && (
        <span style={{ marginTop: "8px" }} className="error-area">
          Lütfen Geçerli Bir Değer Giriniz
        </span>
      )}
      <label htmlFor="passwords">Sifre</label>
      <input
        id="passwords"
        type="password"
        placeholder="Password"
        {...register("password", {
          required: true,
          maxLength: 20,
          minLength: 8,
        })}
        className={errors.password?.type ? "input-error" : ""}
      />
      {errors.password && errors.password.type === "required" && (
        <span style={{ marginTop: "8px" }} className="error-area">
          Bu Alan Boş Olamaz
        </span>
      )}
      {errors.password?.type === "maxLength" && (
        <span style={{ marginTop: "8px" }} className="error-area">Girilen Parola Çok uzun</span>
      )}
      {errors.password?.type === "minLength" && (
        <span style={{ marginTop: "8px" }} className="error-area">Girilen Parola Çok Kısa</span>
      )}
      <input type="submit" value="Giriş Yap" />
    </form>
  );
};

export default Login;
