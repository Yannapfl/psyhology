import ModalChangePsy from "./ModalChangePsy";
import ModalComplaint from "./ModalComplaint";
import ModalSuccess from "./ModalSuccess";

export default function ModalManager({
  activeModal,
  setActiveModal,
  onChangeStatus,
}: {
  activeModal: "change" | "complaint" | "success";
  setActiveModal: (modal: null | "change" | "complaint" | "success") => void;
  onChangeStatus: () => void;
}) {

  return (
    <>
      {activeModal === "change" && (
        <ModalChangePsy
          onClose={() => setActiveModal(null)}
          onComplaint={() => setActiveModal("complaint")}
          onSuccess={() => {
            onChangeStatus();
            setActiveModal("success");
          }}
        />
      )}

      {activeModal === "complaint" && (
        <ModalComplaint
          onClose={() => {
            onChangeStatus();
            setActiveModal("change")
          }}
          onSuccess={() => setActiveModal("change")}
        />
      )}

      {activeModal === "success" && (
        <ModalSuccess 
        onClose={() => setActiveModal(null)}
        onComplant={() => setActiveModal("complaint")}
        />
      )}
    </>
  );
}
