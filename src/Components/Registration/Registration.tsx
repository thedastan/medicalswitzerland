/* External dependencies */
import { Box, Text } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Trans, useTranslation } from "react-i18next";

/* Local dependencies */
import SvgEyePassword from "../../assets/svg/SvgEyePassword";
import SvgClose from "../../assets/svg/SvgClose";
import SvgEye from "../../assets/svg/SvgEye";
import "./style.scss";

import { useAppSelector } from "../../Hooks/Hooks";
import {
  useActionsAuth,
  useActionsForMessage,
  useActionsUser,
} from "../../Hooks/useActions";
import API, { API_ADDRESS } from "../../Api";

interface IAuthPostData {
  email: string;
  password: string;
  confirm: string;
}

interface Inputs {
  email?: string;
  password?: string;
}

export default function Registration() {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { ActionGetUser } = useActionsUser();
  const { LoginPost, ActiveModalRegistration } = useActionsAuth();
  const { ActionReset, ActionError, ActionErrorMessenger } =
    useActionsForMessage();
  const { loading, loginLoder } = useAppSelector((state) => state.authReducer);
  const { user } = useAppSelector((state) => state.userReducer);

  const [dataPost, setDataPost] = useState<IAuthPostData>({
    confirm: "",
    email: "",
    password: "",
  });
  const [validate, setValidate] = useState({
    confirm: false,
    email: false,
    password: false,
  });
  const [eye, setEye] = useState({ password: false, confirm: false });

  const listInput = [
    {
      id: 1,
      placeholder: "Enter your email",
      name: "email",
      register: "email",
      type: "text",
      value: dataPost.email,
      valdation: validate.email,
      required: true,
      pattern: /^\S+@\S+$/i,
      errors: errors.email,
    },
    {
      id: 3,
      placeholder: "Enter new password",
      name: "password",
      register: "password",
      type: eye.password ? "text" : "password",
      value: dataPost.password,
      valdation: validate.password,
      required: true,
      errors: errors.password,
      eye: <Box>{eye.password ? <SvgEye /> : <SvgEyePassword />}</Box>,
    },
  ];

  const inputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    keys: string
  ) => {
    setDataPost({ ...dataPost, [`${keys}`]: e.target.value });
  };

  const handleAuthPost = () => {
    if (user.email) {
      axios
        .post(`${API_ADDRESS}users/auth/`, {
          email: user.email,
          password: dataPost.password,
        })
        .then((response) => {
          localStorage.setItem("accessToken", response.data.access);
          localStorage.setItem("refreshToken", response.data.refresh);
          ActiveModalRegistration(false);
          ActionGetUser(window.location.pathname.slice(6));
          window.location.reload();
        })
        .catch((e) => {
          setValidate({ ...validate, password: true });
        });
    } else {
      ActionError(true);
      ActionErrorMessenger("There is no such thing active account");
    }
  };

  const handleLoginUser = () => {
    if (dataPost.password !== dataPost.confirm) {
      setValidate({ ...validate, confirm: true });
    } else {
      LoginPost(window.location.pathname.slice(6), {
        email: dataPost.email,
        password: dataPost.password,
        username: "",
        avatar: "",
        contact: "",
        birth_date: null,
        allergies: "",
        emergency_contact: "",
        particularities: "",
        operation: "",
        allergies_text: "",
        medications: "",
        why_diagnose: "",
        profession: "",
        card_id: user.card_id,
        location: "",
        full_name: "",
      });
      ActiveModalRegistration(false);
      ActionGetUser(window.location.pathname.slice(6));
    }
  };

  const changeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataPost({ ...dataPost, confirm: e.target.value });
  };

  const forgotPassword = () => {
    axios
      .post(`${API_ADDRESS}users/reset_link/`, { email: user.email })
      .then(() => {
        ActionReset(true);
      })
      .catch(() => {
        ActionError(true);
        ActionErrorMessenger("Email not for forgot password");
      });
  };

  useEffect(() => {
    if (dataPost.password === dataPost.confirm) {
      setValidate({ ...validate, confirm: false });
    }
  }, [validate.confirm]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.3,
          },
        }}
        className={`modal-backdrop`}
        key={1}
        onClick={() => ActiveModalRegistration(false)}
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{
          scale: 1,
          transition: {
            duration: 0.3,
          },
        }}
        className="modal--content"
        key={2}
        onClick={() => ActiveModalRegistration(false)}
      >
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
            transition: {
              delay: 0.3,
              duration: 0.3,
            },
          }}
          onClick={(e) => e.stopPropagation()}
          className="modal--content__wrapper"
          key={3}
        >
          <Box bg="#272727" h="auto" rounded="12px" zIndex="6">
            <Box
              w="17px"
              h="17px"
              ml="auto"
              pr="25px"
              pt="4px"
              cursor="pointer"
              onClick={() => ActiveModalRegistration(false)}
            >
              <SvgClose />
            </Box>
            {user.is_first_time ? (
              <>
                <Text
                  color="white"
                  fontSize="15px"
                  fontWeight="200"
                  textAlign="center"
                  fontFamily="inter"
                  mb="32px"
                >
                  <Trans>register</Trans>
                </Text>

                {loading ? (
                  <Text>Loading...</Text>
                ) : (
                  <form onSubmit={handleSubmit(handleLoginUser)}>
                    <Box display="flex" flexDir="column" maxW="300px" mx="auto">
                      {listInput.map((el, index) => (
                        <Box
                          key={el.id}
                          mb="10px"
                          w="100%"
                          mx="auto"
                          pos="relative"
                        >
                          <Input
                            placeholder={el.placeholder}
                            textAlign="center"
                            color="#7C7575"
                            fontSize="15px"
                            fontWeight="200"
                            textColor="#7C7575"
                            rounded="4px"
                            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                            h="50px"
                            bg="#303030"
                            type={el.type}
                            {...register(index === 0 ? "email" : "password", {
                              required: el.required,
                              pattern: el.pattern,
                            })}
                            border={
                              el.errors ? "1px solid red" : "1px solid #303030"
                            }
                            defaultValue={el.value}
                            onChange={(e) => inputChange(e, el.name)}
                          />
                          <Box
                            pos="absolute"
                            zIndex="8"
                            right="12px"
                            top="0"
                            bottom="0"
                            display="flex"
                            alignItems="center"
                            cursor="pointer"
                            onClick={() =>
                              setEye({ ...eye, password: !eye.password })
                            }
                          >
                            {el.eye}
                          </Box>
                        </Box>
                      ))}
                      <Box mb="17px" w="100%" mx="auto" position="relative">
                        <Input
                          placeholder="Confirm  password"
                          textAlign="center"
                          color="#7C7575"
                          fontSize="15px"
                          fontWeight="200"
                          textColor="#7C7575"
                          rounded="4px"
                          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                          h="50px"
                          bg="#303030"
                          type={eye.confirm ? "text" : "password"}
                          border={
                            validate.confirm
                              ? "1px solid red"
                              : "1px solid #303030"
                          }
                          defaultValue={dataPost.confirm}
                          onChange={(e) => changeConfirmPassword(e)}
                        />
                        <Box
                          pos="absolute"
                          zIndex="8"
                          right="12px"
                          top="0"
                          bottom="0"
                          display="flex"
                          alignItems="center"
                          cursor="pointer"
                          onClick={() =>
                            setEye({ ...eye, confirm: !eye.confirm })
                          }
                        >
                          {eye.confirm ? <SvgEye /> : <SvgEyePassword />}
                        </Box>
                      </Box>
                      {errors.email && (
                        <Text
                          color="#FF0000"
                          fontSize="10px"
                          fontWeight="200"
                          fontFamily="inter"
                          mb="7px"
                        >
                          Wrong email address
                        </Text>
                      )}
                      {errors.password && (
                        <Text
                          color="#FF0000"
                          fontSize="10px"
                          fontWeight="200"
                          fontFamily="inter"
                          mb="7px"
                        >
                          Required fields
                        </Text>
                      )}
                      {validate.confirm && (
                        <Text
                          color="#FF0000"
                          fontSize="10px"
                          fontWeight="200"
                          fontFamily="inter"
                          mb="7px"
                        >
                          Password does not match
                        </Text>
                      )}
                      <Button
                        fontFamily="inter"
                        fontSize="10px"
                        w="100%"
                        h="40px"
                        bg="#0B6CFF"
                        textColor="white"
                        fontWeight="500"
                        border="1px solid #0B6CFF"
                        rounded="5px"
                        mx="auto"
                        type="submit"
                        mb="48px"
                      >
                        <Trans>register</Trans>
                      </Button>
                    </Box>
                  </form>
                )}
              </>
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignContent="center"
                mt="12px"
              >
                {loginLoder ? (
                  <Text textColor="white" textAlign="center">
                    Loading...
                  </Text>
                ) : (
                  <Box mb="3px" w="70vw">
                    <Text
                      fontFamily="inter"
                      fontWeight="300"
                      textColor="white"
                      textAlign="center"
                      mb="29px"
                      fontSize="15"

                    >
                      Welcome to your medicalswitzerland HealthCard 
                    </Text>
                    <Box position="relative">
                      <Input
                        color="#7C7575"
                        placeholder="Enter password"
                        fontSize="15px"
                        fontWeight="200"
                        textColor="#7C7575"
                        rounded="4px"
                        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                        border={
                          validate.password
                            ? "1px solid #FF0000"
                            : "1px solid #303030"
                        }
                        h="50px"
                        bg="#303030"
                        textAlign="center"
                        type={eye.password ? "text" : "password"}
                        onChange={(e) =>
                          setDataPost({ ...dataPost, password: e.target.value })
                        }
                      />
                      <Box
                        pos="absolute"
                        zIndex="8"
                        right="12px"
                        top="0"
                        bottom="0"
                        display="flex"
                        alignItems="center"
                        cursor="pointer"
                        onClick={() =>
                          setEye({ ...eye, password: !eye.password })
                        }
                      >
                        {eye.password ? <SvgEye /> : <SvgEyePassword />}
                      </Box>
                    </Box>
                    <Text
                      fontWeight="500"
                      mt="5px"
                      color="#6A6A6A"
                      fontSize="12px"
                      mb="8px"
                      textAlign="end"
                      fontFamily="inter"
                      cursor="pointer"
                      onClick={forgotPassword}
                    >
                      passwort vergessen?
                    </Text>
                    {validate.password && (
                      <Text
                        color="#FF0000"
                        fontSize="10px"
                        fontWeight="200"
                        fontFamily="inter"
                        mb="7px"
                      >
                        Fehler!!! Überprüfen Sie den Benutzernamen oder das
                        Passwort
                      </Text>
                    )}
                    <Button
                      fontFamily="inter"
                      fontSize="13px"
                      w="100%"
                      h="40px"
                      bg="#0B6CFF"
                      textColor="white"
                      fontWeight="500"
                      border="1px solid #0B6CFF"
                      rounded="5px"
                      mx="auto"
                      mb="51px"
                      onClick={handleAuthPost}
                    >
                      <Trans>login</Trans>
                    </Button>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
