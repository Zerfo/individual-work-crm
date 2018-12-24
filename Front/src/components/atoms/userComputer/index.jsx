import React from 'react';
import Pt from 'prop-types';

import './userComputer.scss';

const showComputerInfo = (computer) => {
  const { specifications } = computer;

  const date = new Date(computer.createdAt);
  const dateComputer = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  return (
    <div className="computer">
      <div className="computer__left">
        <h3 className="computer__left__h3">Общая информация:</h3>
        <div className="computer__left__id">
          ID: {computer.id}
        </div>
        <div className="computer__left__cabinet">
          Кабинет: {computer.cabinetNumber}
        </div>
        <div className="computer__left__date">
          Куплен в компании: {dateComputer}
        </div>
        {computer.underRepair ? <div style={{color: 'red'}}>На ремонте</div> : null}
      </div>
      <div className="computer__right">
        <h3 className="computer__right__h3">Спецификация ПК:</h3>
        <div className="computer__right__processor">
          Процессор: {specifications.processor}
        </div>
        <div className="computer__right__videoCard">
          Видеокарта: {specifications.videoCard}
        </div>
        <div className="computer__right__RAM">
          Оперативная память: {specifications.RAM}
        </div>
        <div className="computer__right__HDD">
          Жесткий диск: {specifications.HDD}
        </div>
      </div>
    </div>
  );
};

const UserComputer = (props) => (
  <div className="userComputer-container">
    <div className="userComputer-container__header">
      <h2 className="userComputer-container__header__h2">
        Ваш компьютер:
      </h2>
    </div>
    <div className="userComputer-container__body">
      {
        props.computer === null
          ? <p className="userComputer-container__body__p">
            У вас пока нет компьютера.
          </p>
          : showComputerInfo(props.computer)
      }
    </div>
  </div>
);

UserComputer.propTypes = {
  computer: Pt.shape({
    specifications: Pt.any,
    pictureURL: Pt.string,
    underRepair: Pt.bool,
    cabinetNumber: Pt.number
  })
};

export default UserComputer;
