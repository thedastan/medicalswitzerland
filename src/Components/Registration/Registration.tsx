/* External dependencies */
import { Box, Text } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

/* Local dependencies */
import SvgClose from "../../assets/svg/SvgClose";
import "./style.scss";

import { useAppSelector } from "../../Hooks/Hooks";
import { useActionsAuth } from "../../Hooks/useActions";
import { getAccessToken } from "../Helpers";
import axios from "axios";
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

interface IAuthProps {
  setModal: (value: boolean) => void;
}

export default function Registration({ setModal }: IAuthProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { AuthPost, LoginPost } = useActionsAuth();
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
      errors: errors.email,
    },
    {
      id: 3,
      placeholder: "Enter new password",
      name: "password",
      register: "password",
      type: "password",
      value: dataPost.password,
      valdation: validate.password,
      required: true,
      errors: errors.password,
    },
  ];

  const inputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    keys: string
  ) => {
    setDataPost({ ...dataPost, [`${keys}`]: e.target.value });
  };

  const userId = user?.card_id;

  const handleAuthPost = () => {
    // AuthPost({
    //   email: dataPost.email,
    //   password: dataPost.password,
    // });
    axios
      .post(`${API_ADDRESS}users/auth/`, {
        email: dataPost.email,
        password: dataPost.password,
      })
      .then((response) => {
        alert("Success");
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
      })
      .catch(() => {
        alert("Error");
      });
  };

  const handleLoginUser = () => {
    if (dataPost.password !== dataPost.confirm) {
      setValidate({ ...validate, confirm: true });
    }
    LoginPost(userId, {
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
      full_name: "Adam",
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
        onClick={() => setModal(false)}
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
        onClick={() => setModal(false)}
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
          <Box bg="thirdlittleGray" h="266px" rounded="12px">
            <Box
              w="17px"
              h="17px"
              ml="auto"
              pr="25px"
              pt="4px"
              cursor="pointer"
              onClick={() => setModal(false)}
            >
              <SvgClose />
            </Box>
            {user.is_first_time ? (
              <>
                <Text
                  color="white"
                  fontSize="10px"
                  fontWeight="200"
                  textAlign="center"
                  fontFamily="inter"
                  mb="7px"
                >
                  REGISTRATION
                </Text>

                {loading ? (
                  <Text>Loading...</Text>
                ) : (
                  <form onSubmit={handleSubmit(handleLoginUser)}>
                    <Box display="flex" flexDir="column" maxW="215px" mx="auto">
                      {listInput.map((el, index) => (
                        <Box key={el.id} mb="3px" w="215px" mx="auto">
                          <Input
                            placeholder={el.placeholder}
                            fontSize="10px"
                            fontWeight="200"
                            textColor="#3C3C3C"
                            rounded="0px"
                            h="35px"
                            bg="#D9D9D9"
                            textAlign="center"
                            type={el.type}
                            {...register(index === 0 ? "email" : "password", {
                              required: el.required,
                            })}
                            border={el.errors ? "1px solid red" : "1px solid"}
                            value={el.value}
                            onChange={(e) => inputChange(e, el.name)}
                          />
                        </Box>
                      ))}
                      <Box mb="3px" w="215px" mx="auto">
                        <Input
                          placeholder="Confirm  password"
                          fontSize="10px"
                          fontWeight="200"
                          textColor="#3C3C3C"
                          rounded="0px"
                          h="35px"
                          bg="#D9D9D9"
                          textAlign="center"
                          border={
                            validate.confirm ? "1px solid red" : "1px solid"
                          }
                          value={dataPost.confirm}
                          onChange={(e) =>
                            setDataPost({
                              ...dataPost,
                              confirm: e.target.value,
                            })
                          }
                        />
                      </Box>
                      <Button
                        fontFamily="inter"
                        fontSize="10px"
                        w="215px"
                        h="34px"
                        bg="black"
                        textColor="white"
                        fontWeight="500"
                        border="1px solid white"
                        rounded="0px"
                        mx="auto"
                        type="submit"
                      >
                        Save
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
                mt="66px"
              >
                {loginLoder ? (
                  <Text textColor="white" textAlign="center">
                    Loading...
                  </Text>
                ) : (
                  <Box mb="3px" w="215px" mx="auto">
                    <Input
                      placeholder="Enter new email"
                      fontSize="10px"
                      fontWeight="200"
                      textColor="#3C3C3C"
                      rounded="0px"
                      h="35px"
                      bg="#D9D9D9"
                      textAlign="center"
                      border="1px solid"
                      mb="10px"
                      onChange={(e) =>
                        setDataPost({ ...dataPost, email: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Enter new password"
                      fontSize="10px"
                      fontWeight="200"
                      textColor="#3C3C3C"
                      rounded="0px"
                      h="35px"
                      bg="#D9D9D9"
                      textAlign="center"
                      border="1px solid"
                      onChange={(e) =>
                        setDataPost({ ...dataPost, password: e.target.value })
                      }
                    />
                    <Text
                      color="#2964FC"
                      fontSize="8px"
                      mb="8px"
                      textAlign="end"
                      fontFamily="inter"
                    >
                      Forgot password
                    </Text>
                    <Button
                      fontFamily="inter"
                      fontSize="10px"
                      w="215px"
                      h="34px"
                      bg="black"
                      textColor="white"
                      fontWeight="500"
                      border="1px solid white"
                      rounded="0px"
                      mx="auto"
                      onClick={handleAuthPost}
                    >
                      Save
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
