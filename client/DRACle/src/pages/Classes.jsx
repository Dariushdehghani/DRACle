import { Info, Plus } from "lucide-react";
import Menu from "../components/Menu";
import SearchField from "../components/SearchField";
import styles from "../styles/Classes.module.scss";
import "../styles/globals.scss";
import { useAuth } from "../context/AuthContext";
import ClassObj from "../components/classPage/ClassObj";
import FloatingButton from "../components/FloatingButton";
import { useState } from "react";
import CreateClassModal from "../components/modals/CreateClass";
import { AnimatePresence, motion } from "framer-motion";
import api from "../lib/api";
import { UserRoundPlus } from "lucide-react";
import TextButton from "../components/TextButton";
import RequestsModal from "../components/modals/RequestsModal";

export default function Classes() {
  const [showCreateClass, setShowCreateClass] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [showAddUsers, setShowAddUsers] = useState(false);
  const { user, role, academy, academyId } = useAuth();
  let classes = [
    {
      id: 1,
      name: "math class 301",
      description: "the math class with mr. darayesh",
      online: false,
    },
    {
      id: 2,
      name: "physics class 301",
      description: "the physics class with mr. salehi",
      online: false,
    },
    {
      id: 3,
      name: "chemistery class 301",
      description: "the chemmy class with mr. dehghani",
      online: false,
    },
  ];
  async function handleOpenMembers(classId) {
    const members = api.get(
      `/fetch/classes/academy/${academyId}/class/${classId}/members`,
    );
    setSelectedClass(classId);
  }
  return (
    <div className={styles.row}>
      <Menu active="classes" user={user} />
      <div className={styles.main}>
        <div className={styles.header}>
          <SearchField />
          <div className={styles.userDetails}>
            <TextButton
              onClick={() => setShowAddUsers(true)}
              content={<UserRoundPlus />}
            />
            <TextButton content={<Info size={22} />} />
          </div>
        </div>
        <div className={styles.classList}>
          {classes?.map((Class) => (
            <ClassObj
              expanded={Class.id === selectedClass}
              uid={Class.id}
              key={classes.indexOf(Class)}
              name={Class.name}
              description={Class.description}
              online={Class.online}
              showMembers={handleOpenMembers}
            />
          ))}
          {(role === "owner" || role === "admin") && (
            <FloatingButton
              onClick={() => setShowCreateClass(true)}
              content={<Plus size={20} />}
            />
          )}
        </div>
        <AnimatePresence>
          {showCreateClass && (
            <CreateClassModal
              open={showCreateClass}
              onClose={() => setShowCreateClass(false)}
            />
          )}
          {showAddUsers && (
            <RequestsModal
              open={showAddUsers}
              onClose={() => setShowAddUsers(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
