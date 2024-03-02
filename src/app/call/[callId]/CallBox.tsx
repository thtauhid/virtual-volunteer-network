"use client";

import type { User } from "@prisma/client";

type Props = {
  user: User;
  callId: string;
};

export default function CallBox(props: Props) {
  const myMeeting = async (element: HTMLDivElement) => {
    const { ZegoUIKitPrebuilt } = await import(
      "@zegocloud/zego-uikit-prebuilt"
    );
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      413317072,
      "e7db0c3a5707800bc56afbb325adee57",
      props.callId,
      props.user.id,
      props.user.name ? props.user.name : props.user.email
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

      sharedLinks: [
        {
          name: "Personal link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            "/call/" +
            props.callId,
        },
      ],
    });
  };
  return <div ref={myMeeting} className="h-[94vh]" />;
}
