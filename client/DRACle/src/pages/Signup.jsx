import styles from "../styles/Login.module.scss";
import bg from "../assets/login-bg.jpg";
import { useTranslation } from "react-i18next";
import Input1 from "../components/Input1";
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  Lock,
  Mail,
  NotebookText,
  School,
  User,
  Users,
} from "lucide-react";
import SButton from "../components/SButton";
import LangSelect from "../components/LanguageSwitcher";
import { useState } from "react";
import { AnimatePresence, backIn, motion } from "framer-motion";
import api from "../lib/api";
import TextButton from "../components/TextButton";
import { email, z } from "zod"

export default function Signup() {
  const [formData, setFormData] = useState({
    academyAction: "",
    academy: "",
    role: "",
    username: "",
    email: '',
    password: ''
  });

  const [[step, direction], setStep] = useState([1, 0]);

  function nextStep() {
    setStep(([current]) => [current + 1, 1]);
  }

  function prevStep() {
    setStep(([current]) => [current - 1, -1]);
  }

  const steps = [
    <SignupForm
      key="form"
      data={formData}
      setData={setFormData}
      onNext={nextStep}
    />,
    <AcademySelection
      key="academy"
      data={formData}
      setData={setFormData}
      onNext={nextStep}
      setStep={setStep}
      onBack={prevStep}
    />,
    <RoleSelection
      key="role"
      data={formData}
      setData={setFormData}
      onBack={prevStep}
      setStep={setStep}
    />,
    <AcademyCreation
    key="academyCreate"
    data={formData}
    setData={setFormData}
    setStep={setStep}
    />,
    <AcademyJoin
    key="academyCreate"
    data={formData}
    setData={setFormData}
    setStep={setStep}
    />
  ];

  return (
    <div className={styles.row}>
      <div className={styles.bg_img_con}>
        <img src={bg} alt="" className={styles.bg_img} />
      </div>

      <div className={styles.login_box}>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          variants={{
            enter: (direction) => ({
              x: direction > 0 ? 100 : -100,
              opacity: 0,
            }),
            center: {
              x: 0,
              opacity: 1,
            },
            exit: (direction) => ({
              x: direction > 0 ? -100 : 100,
              opacity: 0,
            }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {steps[step - 1]}
        </motion.div>
      </AnimatePresence>
      </div>
    </div>
  );
}

function SignupForm({ data, setData, onNext }) {
  const { t } = useTranslation();
  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false
  })
  const userSchema = z.object({
    username: z.string().min(4).max(12),
    email: z.string().email(),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, {message: "password not valid"})
  })

  async function handleSubmit(event) {
    event.preventDefault();
    setErrors({
      username: false,
      email: false,
      password: false
    })

    const formData = new FormData(event.currentTarget);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    const check = userSchema.safeParse({
      username,
      email,
      password
    })

    if (check.error) {
      check.error.issues.forEach(err => setErrors((perv) => ({
        ...perv,
        [err.path[0]] : true
      })))
      console.log(check)
      return;
    }

    try {
      const { data } = await api.post("/auth/check-account", {
        username,
        email
      });

      const { availability } = data

      if (availability) {
        console.log(availability)
        if (!availability.username) {
          setErrors((prev) => ({
            ...prev,
            username: true,
          }))
        } 
        if (!availability.email) {
          setErrors((prev) => ({
            ...prev,
            email: true,
          }))
        }
        console.log(errors)
      } else {
        onNext()
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form
      className={styles.login_box_container}
      onSubmit={handleSubmit}
    >
      <h1>{t("signup")}</h1>

      <Input1
        name="username"
        icon={User}
        error={errors.username}
        placeholder={t("username")}
        value={data.username}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            username: e.target.value,
          }))
        }
      />

      <Input1
        name="email"
        icon={Mail}
        error={errors.email}
        type="email"
        placeholder={t("email")}
        value={data.email}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            email: e.target.value,
          }))
        }
      />

      <Input1
        name="password"
        icon={Lock}
        error={errors.password}
        type="password"
        placeholder={t("password")}
        value={data.password}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            password: e.target.value,
          }))
        }
      />

      <SButton
        icon={ArrowRight}
        type="submit"
      />

      <LangSelect />
    </form>
  );
}

function AcademySelection({
  data,
  setData,
  onNext,
  setStep,
  onBack,
}) {
  const { t } = useTranslation();

  function select(option) {
    setData((prev) => ({
      ...prev,
      academyAction: option,
    }));
    if (option === "join") {
      onNext();
    } else {
      setStep(() => [4, 1])
    }
  }

  return (
    <div className={styles.login_box_container}>
      <h1>{t("academy")}</h1>

      <button
        type="button"
        onClick={() => select("create")}
      >
        <School />
        {t("new academy")}
      </button>

      <button
        type="button"
        onClick={() => select("join")}
      >
        <Users />
        {t("join academy")}
      </button>

      <button
        type="button"
        onClick={onBack}
      >
        {t("back")}
      </button>
    </div>
  );
}

function RoleSelection({
  data,
  setData,
  onBack,
  setStep,
}) {
  const { t } = useTranslation();

  function selectRole(role) {
    setData((prev) => ({
      ...prev,
      role,
    }));
    setStep([5,1])
  }

  return (
    <div className={styles.login_box_container}>
      <h1>{t("select_role")}</h1>

      <button
        type="button"
        onClick={() => selectRole("student")}
      >
        <GraduationCap />
        {t("student")}
      </button>

      <button
        type="button"
        onClick={() => selectRole("teacher")}
      >
        <User />
        {t("teacher")}
      </button>

      <button
        type="button"
        onClick={() => selectRole("assistant")}
      >
        <Users />
        {t("assistant")}
      </button>

      <button
        type="button"
        onClick={onBack}
      >
        {t("back")}
      </button>
    </div>
  );
}

function AcademyCreation({
  data,
  setData,
  setStep,
}) {
  const { t } = useTranslation()
  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const academy =  formData.get("academy_name")

    setData((prev) => ({
      ...prev,
      academy,
    }));

    api.post("/auth/register", 
      {
        ...data,
        academy,
      }
    )

  }

  return(
    <form onSubmit={handleSubmit} className={styles.login_box_container} >
      <h1>{t("new academy")}</h1>
      <Input1
      name="academy_name"
      icon={NotebookText}
      type="text"
      placeholder={t("academy name")}
      />
      <SButton
      icon={ArrowRight}
      type="submit"
      />
      <TextButton
      content={
        <>
        {t("back")}
        <ArrowLeft/>
        </>
      }
      onClick={() => setStep(() => [2, -1])}
      />
    </form>
  )
}

function AcademyJoin({
  data,
  setData,
  setStep,
}) {
  const { t } = useTranslation()
  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const academy =  formData.get("academy_code")

    setData((prev) => ({
      ...prev,
      academy,
    }));

    api.post("/auth/register", 
      {
        ...data,
        academy,
      }
    )

  }

  return(
    <form onSubmit={handleSubmit} className={styles.login_box_container} >
      <h1>{t("join academy")}</h1>
      <Input1
      name="academy_code"
      icon={NotebookText}
      type="text"
      placeholder={t("academy invite code")}
      />
      <SButton
      icon={ArrowRight}
      type="submit"
      />
      <TextButton
      content={
        <>
        {t("back")}
        <ArrowLeft/>
        </>
      }
      onClick={() => setStep(() => [2, -1])}
      />
    </form>
  )
}