/* eslint-disable react-refresh/only-export-components */
import Icons from "components/icons";
import { useModalNotification } from "./ModalNotificationProvider";
import tw from "tailwind-styled-components";
import { HTMLAttributes, useEffect, useRef, Fragment } from "react";

type X = "left" | "center" | "right";
type Y = "top" | "center" | "bottom";

type PositionYX = `${Y}-${X}`;

type NotificationType = "info" | "error" | "success" | "warning";
type Content = JSX.Element | string;
type Options = {
  type?: NotificationType;
  position?: PositionYX;
  time?: number;
};
type NotificationtId = `noatification${number}`;

type Ids = { [key in PositionYX]: { [key: NotificationtId]: Content } };

/* 
 What we are doing here?
 Ans:- 
   we are adding one component per position to useModalNotification,
   we are using position name as component's id in useModalNotification
   one postion component can have many notification
   if notifications are empty in one position...we'll remove the content from useModalNotification
   we are keeping track of all notification in notificationsRef

*/

export default function useNotification() {
  const { addContent, removeContent } = useModalNotification();
  const idsCount = useRef(0);

  const notificationsRef = useRef<Ids>({
    "top-left": {},
    "top-center": {},
    "top-right": {},
    "center-left": {},
    "center-center": {},
    "center-right": {},
    "bottom-left": {},
    "bottom-center": {},
    "bottom-right": {},
  });

  const nextId = (): NotificationtId => `noatification${idsCount.current++}`;

  const renderNotifications = (position: PositionYX) => {
    const isEmpty =
      Object.keys(notificationsRef.current[position]).length === 0;

    if (isEmpty) removeContent(position);
    else {
      const Position = PositionContainer[position];
      const noticfications = (
        <Position>
          {Object.entries(notificationsRef.current[position])
            .reverse()
            .map(([key, content]) => (
              <Fragment key={key}>{content}</Fragment>
            ))}
        </Position>
      );
      addContent(position, noticfications);
    }
  };

  const addNotification = (
    position: PositionYX,
    id: NotificationtId,
    content: Content,
  ) => {
    notificationsRef.current[position][id] = content;
    renderNotifications(position);
  };

  const removeNotification = (position: PositionYX, id: NotificationtId) => {
    delete notificationsRef.current[position][id];
    renderNotifications(position);
  };

  return {
    notify: (content: Content, options?: Options) => {
      const newOptions = {
        ...{ type: "info", position: "top-right", time: 3000 },
        ...options,
      } as Required<Options>;

      const id = nextId();
      const remove = () => removeNotification(newOptions.position, id);

      addNotification(
        newOptions.position,
        id,
        <Notification content={content} options={newOptions} remove={remove} />,
      );
    },
  };
}

type NotificationProps = {
  content: Content;
  remove: VoidFunction;
  options: Required<Options>;
};
const Notification = ({ content, remove, options }: NotificationProps) => {
  const { type, time } = options;
  const timerRef = useRef<number>();
  const timeLeftRef = useRef(time);

  const MessageContainer = NotificationContainer[type];
  const Icon = NotificationIcon[type];

  const close = () => {
    clearInterval(timerRef.current);
    remove();
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      timeLeftRef.current = timeLeftRef.current - 20;
      if (timeLeftRef.current <= 0) close();
    }, 20);
  };

  const pauseTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = undefined;
  };

  useEffect(() => {
    startTimer();
    return () => {
      timerRef.current && clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MessageContainer onMouseEnter={pauseTimer} onMouseLeave={startTimer}>
      <Icon />
      <Message>{content}</Message>
      <Close onClick={close} />
      <Progressbar
        className="absolute bottom-0 left-0 bg-white h-1"
        time={time}
      />
    </MessageContainer>
  );
};

type ProgressbarProps = HTMLAttributes<HTMLDivElement> & { time: number };
const Progressbar = ({ time, ...rest }: ProgressbarProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // avoid inline style....bcz of csp issue
    if (elementRef.current)
      elementRef.current.style.animationDuration = `${time}ms`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Bar ref={elementRef} {...rest} />;
};

const BaseContainer = tw.div`slide relative flex flex-row rounded-md p-3 gap-2 text-white items-start`;
const NotificationContainer = {
  info: tw(BaseContainer)`bg-blue-500`,
  error: tw(BaseContainer)`bg-red-500`,
  success: tw(BaseContainer)`bg-green-500`,
  warning: tw(BaseContainer)`bg-yellow-500`,
};

const NotificationIcon = {
  info: tw(Icons.Info)`w-5 h-5 flex-grow-0 `,
  error: tw(Icons.Error)`w-5 h-5 flex-grow-0 `,
  success: tw(Icons.Check)`w-5 h-5 flex-grow-0 `,
  warning: tw(Icons.Alert)`w-5 h-5 flex-grow-0 `,
};

const Message = tw.div`flex-grow leading-5`;

const Close = tw(Icons.Close)`w-5 h-5 flex-grow-0 cursor-pointer`;

const Position = tw.div`absolute z-[51] min-w-[300px] flex flex-col gap-2`;

const PositionContainer = {
  "top-left": tw(Position)`top-2 left-2`,
  "top-center": tw(Position)`top-2 left-1/3`,
  "top-right": tw(Position)`top-2 right-2`,
  "center-left": tw(Position)`top-1/3 left-2`,
  "center-center": tw(Position)`top-1/3 left-1/3`,
  "center-right": tw(Position)`top-1/3 right-2`,
  "bottom-left": tw(Position)`bottom-2 left-2`,
  "bottom-center": tw(Position)`bottom-2 left-1/2`,
  "bottom-right": tw(Position)`bottom-2 right-2`,
};
const Bar = tw.div`progress-bar-backwards`;
