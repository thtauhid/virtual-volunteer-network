"use client";

import type { User, Call } from "@prisma/client";

type Props = {
  user: User;
  call: Call;
};

export default function CallBox(props: Props) {
  const myMeeting = async (element: HTMLDivElement) => {
    const { ZegoUIKitPrebuilt } = await import(
      "@zegocloud/zego-uikit-prebuilt"
    );
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      1958862720,
      "138f8e35306a795e0f249da21972be5e",
      props.call.id.toString(),
      props.user.id,
      props.user.name ? props.user.name : ""
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      turnOnMicrophoneWhenJoining: true,
      turnOnCameraWhenJoining: true,
      showMyCameraToggleButton: true,
      showMyMicrophoneToggleButton: true,
      showAudioVideoSettingsButton: true,
      showScreenSharingButton: true,
      showTextChat: true,
      showUserList: true,
      maxUsers: 50,
      layout: "Auto",
      showLayoutButton: true,
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },

      onJoinRoom: async () => {
        await fetch(`/api/organization/workspaces/calls`, {
          method: "POST",
          body: JSON.stringify({
            id: props.call.id,
            has_started: true,
            has_ended: false,
          }),
        });
      },

      onLeaveRoom: async () => {
        await fetch(`/api/organization/workspaces/calls`, {
          method: "POST",
          body: JSON.stringify({
            id: props.call.id,
            has_started: true,
            has_ended: true,
          }),
        });
      },

      sharedLinks: [
        {
          name: "Personal link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            "/call/" +
            props.call.id.toString(),
        },
      ],
    });
  };
  return <div ref={myMeeting} className="h-[80vh]" />;
}
