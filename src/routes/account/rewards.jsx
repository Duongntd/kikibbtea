import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import bubbleTeaIcon from "../../assets/icons/bubbleTeaIcon.svg";

export default function Rewards() {
  const [data, setData] = React.useState({});

  const userId = localStorage.getItem("user");
  const docSnap = async (ref) => {
    const res = await getDoc(ref);
    const doc = res?.data();
    setData(doc[userId]);
  };
  React.useEffect(() => {
    if (userId) {
      const docRef = doc(db, "greifswald", "users");
      docSnap(docRef);
    }
    // eslint-disable-next-line
  }, []);
  const pointCalc = () => {
    let point = data?.point;
    let progress = 0;
    if (point && point <= 25) {
      progress = 100 * (point / 25) * 0.06;
    } else if (point && point <= 50) {
      progress = 6 + 100 * ((point - 25) / 25) * 0.22;
    } else if (point && point <= 100) {
      progress = 28 + 100 * ((point - 50) / 50) * 0.22;
    } else if (point && point <= 200) {
      progress = 50 + 100 * ((point - 100) / 100) * 0.22;
    } else if (point && point <= 400) {
      progress = 72 + 100 * ((point - 200) / 200) * 0.22;
    } else if (point && point > 400 && point < 510) {
      progress = 94 + 100 * ((point - 400) / 400) * 0.22;
    } else if (point && point >= 510) {
      progress = 100;
    }
    return progress;
  };
  const progressCur = {
    left: `${pointCalc()}%`,
  };
  const progress = {
    width: `${pointCalc()}%`,
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <section className="reward-section">
        <div>Reward Status</div>
        <div className="flex justify-center items-center gap-2">
          <span className="text-4xl">{data?.point}</span>
          <img
            src={bubbleTeaIcon}
            alt="bubble-tea-icon"
            width={25}
            className="pb-2"
          />
        </div>
        <div className="flex justify-center items-center">
          <p>KI BALANCE</p>
        </div>
        <div className="progress-container mx-auto mb-8 mt-6">
          <div className="progress-bar">
            <div className="progress" style={progress}></div>
            <div className="progress-cur" style={progressCur}>
              <FontAwesomeIcon icon="fa-solid fa-location-pin" />
            </div>
            <div className="checkpoint cp1">
              <div className="checkmark"></div>
              <div className="checkmark-text">25</div>
            </div>
            <div className="checkpoint cp2">
              <div className="checkmark"></div>
              <div className="checkmark-text">50</div>
            </div>
            <div className="checkpoint cp3">
              <div className="checkmark"></div>
              <div className="checkmark-text">100</div>
            </div>
            <div className="checkpoint cp4">
              <div className="checkmark"></div>
              <div className="checkmark-text">200</div>
            </div>
            <div className="checkpoint cp5">
              <div className="checkmark"></div>
              <div className="checkmark-text">400</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-14">
          <div className="reward-text-1">
            <div className="flex flex-col">
              <p>You receive one free drink for each 10 KI</p>
              <p>Your unclaimed free drinks: 0</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div>Rewards</div>
        <div className="flex justify-center">
          <div className="reward-list flex flex-col gap-2 ">
            <div className="reward-item">
              <div className="item-count">25</div>
              <div className="item-text">
                Customize your drink espresso shot, dairy substitute, syrup and
                more
              </div>
            </div>
            <div className="reward-item">
              <div className="item-count">50</div>
              <div className="item-text">
                Customize your drink espresso shot, dairy substitute, syrup and
                more
              </div>
            </div>
            <div className="reward-item">
              <div className="item-count">100</div>
              <div className="item-text">
                Customize your drink espresso shot, dairy substitute, syrup and
                more
              </div>
            </div>
            <div className="reward-item">
              <div className="item-count">200</div>
              <div className="item-text">
                Customize your drink espresso shot, dairy substitute, syrup and
                more
              </div>
            </div>
            <div className="reward-item">
              <div className="item-count">400</div>
              <div className="item-text">
                Customize your drink espresso shot, dairy substitute, syrup and
                more
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
