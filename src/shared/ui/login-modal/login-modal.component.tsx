import { Button, Input, Modal } from "@mantine/core";
import { authorize } from "@shared/api";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { UnknownAction } from "redux";

const LoginModal = ({
  onClose,
  opened,
}: {
  opened: boolean;
  onClose: () => void;
}) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const submit = () => {
    dispatch(
      authorize({
        login,
        password,
      }) as unknown as UnknownAction
    );
    onClose();
  };

  return (
    <Modal onClose={onClose} opened={opened} title={"Авторизация"}>
      <div>
        <div className="flex gap-1">
          <h2>Логин</h2>
          <span className="text-red-500">*</span>
        </div>
        <Input
          placeholder="Введите логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          classNames={{ input: "focus:border-[#FF5500]" }}
        />
      </div>
      <div className="mt-4">
        <div className="flex">
          <h2>Пароль</h2>
          <span className="text-red-500">*</span>
        </div>
        <Input
          type="password"
          placeholder="Введите пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          classNames={{ input: "focus:border-[#FF5500]" }}
        />
      </div>
      <div className="flex gap-2 mt-6">
        <Button
          onClick={submit}
          className="border-red-500 bg-red-500 border text-white rounded-lg px-2 py-1 hover:bg-red-500"
        >
          Войти
        </Button>
        <Button
          onClick={onClose}
          className="border-red-500 bg-transparent border text-red-500 rounded-lg px-2 py-1 hover:bg-transparent hover:text-red-500"
        >
          Отменить
        </Button>
      </div>
    </Modal>
  );
};

export default LoginModal;
