import React from "react";

const Information = () => {
  return (
    <>
      <div className="min-h-screen flex-1 bg-black p-12 rounded-3xl shadow-lg flex flex-col full">
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-black w-64 h-20 rounded-3xl shadow-lg"></div>
        <div className="bg-white flex-1 p-18 rounded-3xl shadow-lg">
          <div className="flex flex-row gap-5 mb-11">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className={`bg-[#D9D9D9] w-6 h-6 flex justify-center items-center rounded-full cursor-pointer transition-all duration-200}`}
              ></div>
            ))}
            <div className=""></div>
          </div>
          <span className="text-4xl">Infomation for</span>
          <div className="flex justify-center intems-center mt-11 mb-11">
            <img
              src="https://media.revolvermag.com/smaecrmuhw/styles/article-banner/2018/08/17/follow_the_leader_0.jpg.webp?t=db5816d2.webp"
              alt=""
              className="w-8/12 h-auto rounded-lg"
            />
          </div>
          <span className="text-3xl">Infomation for</span>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            tristique nisi nec nulla ultricies, ac rutrum elit finibus. Duis at
            justo molestie, tempor neque eget, elementum orci. Praesent at augue
            ut nisi elementum tincidunt. Interdum et malesuada fames ac ante
            ipsum primis in faucibus. Donec rutrum imperdiet sapien vel egestas.
            Proin pellentesque enim vel massa pharetra iaculis in eget purus.
            Cras porta nibh a elit blandit venenatis. Aliquam porttitor rutrum
            arcu. Maecenas ornare luctus ipsum scelerisque pellentesque. Sed
            facilisis, ipsum rutrum venenatis ultricies, massa neque placerat
            metus, tempor viverra diam purus pellentesque lectus. Praesent
            feugiat urna vel tortor consectetur, vel porta velit sagittis. Donec
            rutrum ex ut augue vestibulum, placerat tempus sem molestie.
            Phasellus sit amet pharetra augue, nec fermentum eros. Quisque
            scelerisque rutrum purus in scelerisque. Cras pharetra mollis
            efficitur. Mauris et sem nulla. Vivamus eleifend ex non ex mattis
            hendrerit. Mauris pulvinar maximus eros sit amet molestie. Cras
            porttitor sodales luctus. Aenean convallis, risus eu tempus varius,
            massa diam tincidunt ex, et feugiat ligula tortor et lacus.
            Curabitur cursus sem et libero ullamcorper euismod. Nulla non
            euismod ex. Vivamus vitae mattis purus. Phasellus pulvinar, leo at
            euismod iaculis, ex ex dignissim ex, nec commodo magna nisl vel
            dolor. Phasellus scelerisque facilisis nibh. Morbi vestibulum,
            ligula vitae iaculis consequat, quam nisl cursus leo, a consectetur
            nisi ex vel sapien. Aenean dignissim a dui quis molestie. Vestibulum
            ante ipsum primis in faucibus orci luctus et ultrices posuere
            cubilia curae; Phasellus luctus massa sit amet arcu tempor mattis.
            Donec sagittis maximus tellus, ut condimentum risus pulvinar quis.
            Sed lacinia nunc at nisl maximus, in dignissim elit consequat.
            Integer consequat quam non leo pharetra egestas. Nullam ligula
            tortor, dictum vitae mi sit amet, tempus consectetur lorem. Nam
            vehicula augue a erat porttitor, a lacinia augue fringilla. Donec
            ultricies nunc molestie venenatis auctor. In volutpat augue eget
            mauris auctor malesuada. Praesent semper et nulla blandit
            ullamcorper. Proin justo lacus, facilisis quis tellus in, vestibulum
            viverra mauris. Morbi a lectus suscipit, ultricies orci et,
            venenatis ligula. Vivamus sit amet tellus mauris. Quisque consequat,
            tellus vel lacinia accumsan, eros eros dapibus risus, nec placerat
            ante quam id nisi. Donec nec rhoncus leo. Aenean dapibus nec turpis
            quis varius. Aliquam eu nulla mattis, maximus libero ac, fringilla
            nisl. Pellentesque vehicula mi est, quis mattis nulla consectetur
            eu. Orci varius natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Maecenas tempus ipsum vitae ornare commodo.
            Integer imperdiet lacinia massa, vel pulvinar massa pharetra eget.
            Morbi malesuada tellus at ornare tincidunt. Praesent blandit libero
            eget arcu pharetra hendrerit. Proin rhoncus hendrerit turpis ac
            placerat. In ac lobortis purus. Duis eget ligula sem. Praesent
            fringilla massa non quam pharetra, ut maximus velit elementum. Proin
            viverra vehicula diam, sed mollis mi vestibulum eu. Duis quis mi
            elit. Phasellus ut dictum nibh, sit amet tempor velit. Duis sit amet
            molestie nisi. Mauris lacinia venenatis erat vitae efficitur.
            Praesent iaculis sapien sem, vel placerat nibh porta in. Cras ac
            dolor efficitur, lacinia lorem non, semper neque. Sed congue
            imperdiet turpis, eget dignissim dui egestas ut. Pellentesque
            faucibus a mauris sit amet vulputate.
          </div>
        </div>
      </div>
    </>
  );
};

export default Information;
